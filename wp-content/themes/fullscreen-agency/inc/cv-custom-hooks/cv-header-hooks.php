<?php
/**
 * Managed the custom functions and hooks for header section of the theme.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

/*-----------------------------------------------------------------------------------------------------------------------*/
if ( ! function_exists( 'fullscreen_agency_header_start' ) ):
	/**
	 * Function for header top start
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_header_start() { ?>
		<header id="masthead" class="site-header">
		<div class="cv-container">
<?php }
endif;	

/*-----------------------------------------------------------------------------------------------------------------------*/
if ( ! function_exists( 'fullscreen_agency_header_site_branding' ) ):
	/**
	 * Function for header site branding
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_header_site_branding() { ?>
		<div class="site-branding">
			<?php
				the_custom_logo();
				if ( is_front_page() || is_home() ) :
			?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php
				else :
			?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php
				endif;
				$fullscreen_agency_description = get_bloginfo( 'description', 'display' );
				if ( $fullscreen_agency_description || is_customize_preview() ) :
			?>
				<p class="site-description"><?php echo wp_kses_post( $fullscreen_agency_description ); /* WPCS: xss ok. */ ?></p>
			<?php endif; ?>
		</div><!-- .site-branding -->

<?php
	}
endif;	

/*-----------------------------------------------------------------------------------------------------------------------*/

if ( ! function_exists( 'fullscreen_agency_header_nav_menu' ) ):
	/**
	 * Function for header nav menu
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_header_nav_menu() {
?>
		<div class="up-down-wrap">
			<span class="fa fa-sort-up"></span>
			<span class="fa fa-sort-down"></span>
		</div>
        <div class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><a href="javascript:void(0);"><i class="fa fa-bars"></i></a></div>
		<nav id="site-navigation" class="main-navigation">
			<?php
				wp_nav_menu( array(
					'theme_location' => 'primary_menu',
					'menu_id'        => 'primary-menu',
				) );
			?>
			<div class="menu-toggle-off"><a href="javascript:void(0);"><i class="fa fa-times"></i></a></div>
		</nav><!-- #site-navigation -->
<?php
	}
endif;	

/*-----------------------------------------------------------------------------------------------------------------------*/

if ( ! function_exists( 'fullscreen_agency_header_social_icon_menu' ) ):
	/**
	 * Function for header social icon menu
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_header_social_icon_menu() { ?>
		<div class="cv-search-social-wrapper">
			<?php
			$icon_lists = get_theme_mod( 'fullscreen_agency_section_header_social_icon_lists', array( 
												array(
													'social_icon' => 'facebook',
													'social_url'  => '#',
												),
												array(
													'social_icon' => 'twitter',
													'social_url'  => '#',
														),
												) );
			if ( !empty( $icon_lists ) && is_array( $icon_lists ) ) {
				foreach ($icon_lists as $icon_list ) {
					if ( ! empty( $icon_list['social_url'] ) ) { ?>
						<li class="cv-social-icon">
							<a href="<?php echo esc_url( $icon_list['social_url'] ); ?>" target="_blank">
								<i class="fa fa-<?php echo esc_attr( $icon_list['social_icon'] ); ?>"></i>
							</a>
						</li>
				<?php }
				}
			}
			fullscreen_agency_search_icon_fnc();
			?>
		</div><!-- .cv-search-social-wrapper -->
		<?php
	}
endif;

/*-----------------------------------------------------------------------------------------------------------------------*/
if ( ! function_exists( 'fullscreen_agency_header_end' ) ):
	/**
	 * Function for header end
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_header_end() { ?>
		</div><!--container-->
		</header><!-- #masthead -->
<?php }
endif;	

/*-----------------------------------------------------------------------------------------------------------------------*/

if ( ! function_exists( 'fullscreen_agency_search_icon_fnc' ) ) :

	/*
	 * Fullscreen Agency Header Search Function
	 *
	 */

	function fullscreen_agency_search_icon_fnc() {
		$fullscreen_agency_search_icon = get_theme_mod( 'fullscreen_agency_search_icon_opt', true );
		if ( false == $fullscreen_agency_search_icon ) {
			return;
		}
?>
		<div class="fullscreen-agency-search-icon"><a href="#"><i class="fa fa-search"></i></a></div>
		<div class="fullscreen-agency-form-wrap">
			<div class="fullscreen-agency-form-close"><a href="#"><i class="fa fa-times"></i></a></div>
			<?php get_search_form(); ?>
		</div>
<?php
	}

endif;

/*-----------------------------------------------------------------------------------------------------------------------*/
add_action( 'fullscreen_agency_header', 'fullscreen_agency_header_start', 5  );
add_action( 'fullscreen_agency_header', 'fullscreen_agency_header_site_branding', 10  );
add_action( 'fullscreen_agency_header', 'fullscreen_agency_header_nav_menu', 15  );
add_action( 'fullscreen_agency_header', 'fullscreen_agency_header_social_icon_menu', 20  );
add_action( 'fullscreen_agency_header', 'fullscreen_agency_header_end', 25  );