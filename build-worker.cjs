const fs=require('node:fs'),path=require('node:path'),esbuild=require('esbuild');
const base=__dirname;
esbuild.buildSync({entryPoints:[path.join(base,'node_modules/@simplewebauthn/browser/esm/index.js')],bundle:true,format:'iife',globalName:'ClubPasskeys',platform:'browser',minify:true,outfile:path.join(base,'dist/passkeys.js')});
let page=fs.readFileSync(path.join(base,'dist/index.html'),'utf8');
page=page.replace('<head>','<head>\n<script>/* SERVER_BOOTSTRAP */</script>\n<script>'+fs.readFileSync(path.join(base,'dist/passkeys.js'),'utf8').replaceAll('</script','<\\/script')+'</script>');
fs.writeFileSync(path.join(base,'dist/index.html'),page);
esbuild.buildSync({entryPoints:[path.join(base,'worker/index.mjs')],bundle:true,format:'esm',platform:'browser',target:'es2022',loader:{'.html':'text'},outfile:path.join(base,'dist/server/index.js'),minify:true});
fs.mkdirSync(path.join(base,'dist/.openai'),{recursive:true});fs.copyFileSync(path.join(base,'.openai/hosting.json'),path.join(base,'dist/.openai/hosting.json'));
console.log('Built server-validated casino and passkey admin.');
