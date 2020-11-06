<?php
/**
 * Managed the custom functions and hooks for footer section of the theme.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */


if( ! function_exists( 'fullscreen_agency_footer_start' ) ):
	/**
	 * Function for footer top start
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_footer_start(){
		$footer_sticky = get_theme_mod( 'fullscreen_agency_footer_sticky_opt', true ); ?>
		
		<footer id="colophon" class="cv-fullpage-section site-footer fp-auto-height">
			<div class="cv-container">
<?php }
endif; 

/*----------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_footer_site_info' ) ):
	/**
	 * Function for footer site info
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_footer_site_info(){ ?>
		<div class="site-info">
			<div class="footer-copyright-txt">
				<?php 
				$copyright_text = get_theme_mod( 'fullscreen_agency_footer_copyright' ); 
				echo esc_html( $copyright_text ); ?>
			
			<span class="sep"> | </span>
				<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s by %2$s.', 'fullscreen-agency' ), 'fullscreen-agency', '<a href="https://codevibrant.com">CodeVibrant</a>' );
				?>
			</div><!-- .footer-copyright-txt -->
		</div><!-- .site-info -->
<?php }
endif; 

/*-----------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_footer_nav_menu' ) ):
	/**
	 * Function for footer nav menu
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_footer_nav_menu(){ ?>
		<nav id="footer-navigation" class="main-navigation">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'footer_menu',
				'menu_id'        => 'footer-menu',
			) );
			?>
		</nav><!-- #site-navigation -->
<?php }
endif; 

/*----------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_footer_end' ) ):
	/**
	 * Function for footer end
	 *
	 * @since 1.0.0
	 */
	function fullscreen_agency_footer_end(){ ?>
				</div><!--cv-containe-->
		</footer><!-- #colophon -->
<?php }
endif; 

/*----------------------------------------------------------------------------------------------------------------------*/
add_action( 'fullscreen_agency_footer', 'fullscreen_agency_footer_start', 5  );
add_action( 'fullscreen_agency_footer', 'fullscreen_agency_footer_site_info', 10  );
add_action( 'fullscreen_agency_footer', 'fullscreen_agency_footer_nav_menu', 15  );
add_action( 'fullscreen_agency_footer', 'fullscreen_agency_footer_end', 20 );