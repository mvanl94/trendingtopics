<?php

$env = "production";

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

if ($env == 'local') {

    // ** MySQL settings - You can get this info from your web host ** //
    /** The name of the database for WordPress */
    define('DB_NAME', 'trendingtopics_nl_wordpress');

    /** MySQL database username */
    define('DB_USER', 'root');

    /** MySQL database password */
    define('DB_PASSWORD', '');

    /** MySQL hostname */
    define('DB_HOST', '127.0.0.1:3307');

} else {

    // ** MySQL settings - You can get this info from your web host ** //
    /** The name of the database for WordPress */
    define('DB_NAME', 'deb120056_trendingtopics');

    /** MySQL database username */
    define('DB_USER', 'deb120056_trendingtopics');

    /** MySQL database password */
    define('DB_PASSWORD', 'niger9');

    /** MySQL hostname */
    define('DB_HOST', '127.0.0.1');

}



/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'UDEV0ovvV)gMtzV#FBBpxQu^Iff%W4ea2JLGjPQnHLgD6vi(4upkXfdK^n6SQEb%');
define('SECURE_AUTH_KEY',  'qRZH%#WbE!#iv2v4y2sVMUxG5O!sht@)L8eJhi)Xc4wg3XOVvtX^0#^bnIBspfgT');
define('LOGGED_IN_KEY',    'RVzq@^QKDaW^01g3!5nl)L%3zhfM1YNf9St45rAeLruZR^fvhHWUC3AXywphyjh%');
define('NONCE_KEY',        'd2EvR4#qTBFNGFq)Cz7nW3m#pGRA$B(M*D#oTx9yPlYE*TfLxJHYW9t@kJ#H*j3)');
define('AUTH_SALT',        'T2vGyk%D7KioP!eypT2SsyWFFesB#HTUpz$M#x@^q%0KGdqRn5Lu^hwN!rknkyVG');
define('SECURE_AUTH_SALT', '02zCBJ1I4H15aTRecg%pcrJjHW$3mnjGk(IFd(y%62Qn0!haGbg(*zGQ3ps(0(V1');
define('LOGGED_IN_SALT',   '72HmsEP)NDojcyUpB6W9kj^Xn%2ApMb1i@FEiPvp!0)aUZ*cc2ZnUuzmDv*%VGwu');
define('NONCE_SALT',       'SNVB$o(1JShkuLn#%9*9Xaj9QNplJUzm1xVS6%gVtrcVMzF4uxXX92msIakOM%BT');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
