<?php

/**
 * Fired during plugin activation
 *
 * @link       valso.nl
 * @since      1.0.0
 *
 * @package    Ff_Square
 * @subpackage Ff_Square/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Ff_Square
 * @subpackage Ff_Square/includes
 * @author     Valso <contact@valso.nl>
 */
class Ff_Square_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

        global $wpdb;

        $table_name = $wpdb->prefix . 'ff_square_comments';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "
        CREATE TABLE `wp_ff_square_comments` (
          `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
          `ip_address` varchar(255) DEFAULT NULL,
          `comment` varchar(255) DEFAULT NULL,
          `post_id` int(11) DEFAULT NULL,
          PRIMARY KEY (`id`),
          UNIQUE KEY `id` (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );

	}

}
