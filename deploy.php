<?php

namespace Deployer;

require 'recipe/common.php';
require __DIR__.'/deploy/recipe/common.php';
require __DIR__.'/deploy/tasks/rsync.php';

configuration( 'deploy/config.yml' );
inventory( 'deploy/hosts.yml' );

task( 'deploy', [
	'deploy:info',
	'deploy:prepare',
	'deploy:lock',
	'deploy:release',
	'deploy:rsync',
	'deploy:shared',
	'deploy:symlink',
	'deploy:unlock',
	'cleanup',
	'success',
]);

after( 'deploy:failed', 'deploy:unlock' );

// dep ssh
// dep deploy [stage]    - Deploy the project
// dep rollback [stage]  - Rollback to a previous release
