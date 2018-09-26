<?php

namespace Deployer;

use RuntimeException;
use Symfony\Component\Yaml\Yaml;

/**
 * @throws \RuntimeException
 */
function configuration( string $file ): void {
	$configFileContent = Yaml::parse( file_get_contents( $file ));
	if( !is_array( $configFileContent )) {
		throw new RuntimeException( 'Error in parsing '.$file.' file.' );
	}
	foreach( $configFileContent as $key => $value ) {
		set( $key, $value );
	}
}
