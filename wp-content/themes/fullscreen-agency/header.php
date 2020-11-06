<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'fullscreen-agency' ); ?></a>

	<?php
		/**
		 * fullscreen_agency_before_header hook
		 *
		 * @since 1.0.0s
		 */
		do_action( 'fullscreen_agency_before_header' );

		/*
		 * Functions for header hook
		 * 
		 * @hooked - fullscreen_agency_header_start - 5
		 * @hooked - fullscreen_agency_header_site_branding - 10
		 * @hooked - fullscreen_agency_header_nav_menu - 15
		 * @hooked - fullscreen_agency_header_social_icon_menu - 20
		 * @hooked - fullscreen_agency_header_end - 25
		 */
		do_action( 'fullscreen_agency_header' );

		if( is_front_page() ) {
	?>
			<div id="cv-fullscreen" class="site-content">
				<div id="content" class="site-content">
	<?php
			
			/**
			 * fullscreen_agency_frontpage_sections hooks
			 */

			do_action( 'fullscreen_agency_frontpage_sections' );

		} else {
			/**
    		 * fullscreen_agency_innerpage_header hook
    		 *
    		 * @hooked - fullscreen_agency_innerpage_header_start - 5
    		 * @hooked - fullscreen_agency_innerpage_header_title - 10
    		 * @hooked - fullscreen_agency_breadcrumb_content - 15
    		 * @hooked - fullscreen_agency_innerpage_header_end - 20
    		 *
    		 * @since 1.0.0
    		 */
    		do_action( 'fullscreen_agency_innerpage_header' );
	?>
        <div class="inner-content-wrapper">
			<div id="content" class="site-content">
				<div class="cv-container">
	<?php
		}
	?>
