#!/usr/bin/env node

const { exec } = require('child_process');
const { performance } = require('perf_hooks');

const args = process.argv.slice(2)[0];
const [command, target] = args?.split(':') || [];

const validProjects = ['vite', 'webpack', 'parcel', 'rollup'];

function runScript(project, script) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶ ${script} → ${project}`);
    const start = performance.now();
    const proc = exec(`cd ${project} && npm run ${script}`);

    proc.on('close', (code) => {
      const time = ((performance.now() - start) / 1000).toFixed(2);
      const status = code === 0 ? '✔ Success' : '✖ Failed';
      console.log(`${status} — ${project} in ${time}s`);
      code === 0 ? resolve() : reject();
    });
  });
}

async function run() {
  try {
		if (command === 'build' && target === 'all') {
			for (const project of validProjects) await runScript(project, 'build');
    } else if (validProjects.includes(target)) {
			await runScript(target, command);
    } else {
			console.log('⚠ Unknown command or target');
    }
  } catch {
    process.exit(1);
  }
}

if (command && target)
	run();
else 
	console.log('⚠ Unknown command or target');