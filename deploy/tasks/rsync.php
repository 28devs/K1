<?php

namespace Deployer;

task( 'deploy:rsync', function() {
	upload( '{{local_path}}/public/', '{{release_path}}/public', [
		'options' => get( 'rsync_options' ),
	]);
	upload( '{{local_path}}/shared/', '{{deploy_path}}/shared/public', [
		'options' => get( 'rsync_options_shared' ),
	]);
});
