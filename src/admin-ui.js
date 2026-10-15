function createAdminUI(engine, callbacks) {
    const $=id=>document.getElementById(id);let auth=engine.auth||{enrolled:false,admin:false,canEnroll:false},working=false;
    let legacy=null;try{const raw=localStorage.getItem('roulette-club-v1');if(raw)legacy=JSON.parse(raw);}catch{}
    async function api(path,body) {
        const response=await fetch(path,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json'},credentials:'same-origin',body:body===undefined?undefined:JSON.stringify(body)});
        const result=await response.json();if(!response.ok)throw new Error(result.error||'管理验证失败。');return result;
    }
    function render() {
        auth=engine.auth||auth;
        $('admin-login').hidden=auth.admin;$('admin-panel').hidden=!auth.admin;
        $('admin-enroll').hidden=!auth.canEnroll;$('admin-signin').hidden=!auth.enrolled;
        $('admin-enroll').disabled=working;$('admin-signin').disabled=working;
        $('admin-auth-status').textContent=working?'请完成系统的 Windows Hello 提示…':!engine.remote?'管理入口需要在已发布网站中打开。':auth.enrolled?'已设置通行密钥。验证后才能管理玩家。':'仅站点所有者可首次绑定管理通行密钥。';
        $('admin-legacy').hidden=!legacy||engine.revision!==0;
        $('club-migration-note').hidden=!engine.legacyPending||window.location.pathname==='/admin';
        const selected=$('admin-adjust-player').value;
        $('admin-adjust-player').replaceChildren(...engine.data.users.map(user=>{const option=document.createElement('option');option.value=user.id;option.textContent=user.name+' · '+(user.recovery?'-'+user.recovery.deficit.toLocaleString()+' · 可用 ':'')+user.balance.toLocaleString();return option;}));
        if(engine.data.users.some(user=>user.id===selected))$('admin-adjust-player').value=selected;
        document.querySelectorAll('[data-admin-action]').forEach(button=>button.disabled=working||!auth.admin||callbacks.locked());
    }
    async function authenticate(register) {
        if(!engine.remote){$('admin-message').textContent='请从已发布网站打开管理入口。';return;}
        if(!window.PublicKeyCredential||!navigator.credentials){$('admin-message').textContent='当前浏览器不支持通行密钥。请在 Windows 上用 Edge 或 Chrome 打开本站。';return;}
        working=true;render();$('admin-message').textContent='';
        try{
            const kind=register?'register':'authenticate',optionsJSON=await api('/api/admin/'+kind+'/options',{});
            const result=register?await ClubPasskeys.startRegistration({optionsJSON}):await ClubPasskeys.startAuthentication({optionsJSON});
            await api('/api/admin/'+kind+'/verify',result);auth=await api('/api/admin/status');engine.auth=auth;
            await engine.sync();$('admin-message').textContent='管理入口已解锁。';callbacks.changed();
        }catch(error){$('admin-message').textContent=error.name==='NotAllowedError'?'验证已取消或超时，尚未修改任何账户。':error.message;}
        finally{working=false;render();}
    }
    $('admin-enroll').addEventListener('click',()=>authenticate(true));$('admin-signin').addEventListener('click',()=>authenticate(false));
    $('admin-lock').addEventListener('click',async()=>{try{await api('/api/admin/logout',{});auth={...auth,admin:false};engine.auth=auth;callbacks.changed();}catch(error){$('admin-message').textContent=error.message;}render();});
    $('admin-adjust-form').addEventListener('submit',async event=>{
        event.preventDefault();
        if(await callbacks.transact(()=>engine.adminAdjust($('admin-adjust-player').value,$('admin-adjust-mode').value,Number($('admin-adjust-amount').value),$('admin-adjust-reason').value),'管理员余额调整已保存并记录。')){$('admin-adjust-amount').value='';$('admin-adjust-reason').value='';}
    });
    $('admin-import').addEventListener('click',async()=>{
        if(!legacy)return;
        if(await callbacks.transact(()=>engine.importLegacy(legacy),'旧存档已导入服务器，本地备份已保留。')){legacy=null;callbacks.changed();}
    });
    return {render,get unlocked(){return Boolean(auth.admin);}};
}
