<?php

namespace Deployer;

task( 'deploy:rsync:public', function() {
	upload( '{{local_path}}/public/', '{{release_path}}/public', [
		'options' => [
			'-k', '--exclude=.DS_Store', '--exclude=press/',
		],
	]);
});

task( 'deploy:rsync:shared', function() {
	upload( '{{local_path}}/shared/', '{{deploy_path}}/shared/public', [
		'options' => [
			'-k', '--exclude=.DS_Store',
		],
	]);
});
