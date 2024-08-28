import fs from 'fs';
import AdmZip from 'adm-zip';

const zip = new AdmZip('modules.zip');
zip.extractAllTo('.');

if (!fs.existsSync('node_modules/.bin')) {
	fs.mkdirSync('node_modules/.bin');
}

fs.symlinkSync('../esbuild/bin/esbuild', 'node_modules/.bin/esbuild');
fs.chmodSync('node_modules/.bin/esbuild', 0o777);
