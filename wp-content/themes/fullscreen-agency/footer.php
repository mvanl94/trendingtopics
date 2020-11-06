<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

	if ( ! is_front_page() ) {
?>             
				</div><!-- .cv-container -->
			</div><!-- #content -->
     	</div><!-- inner-content-wrapper -->   
<?php
	}
		
	/*
	 * fullscreen_agency_footer hooks
	 * 
	 * @hooked - fullscreen_agency_footer_start - 5
	 * @hooked - fullscreen_agency_footer_site_info - 10
	 * @hooked - fullscreen_agency_footer_nav_menu - 15
	 * @hooked - fullscreen_agency_footer_end - 20
	 *
	 */
	do_action( 'fullscreen_agency_footer' );
	
	if ( is_front_page() ) {
		echo '</div>';
        echo '</div><!-- #cv-fullscreen -->';
    }
?>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
