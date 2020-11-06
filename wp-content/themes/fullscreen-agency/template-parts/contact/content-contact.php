<?php
/**
 * Template part for displaying section of contact content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

$fullscreen_agency_enable_contact_section = get_theme_mod( 'fullscreen_agency_enable_contact_section', true );
$fullscreen_agency_contact_page 		= get_theme_mod( 'fullscreen_agency_contact_page' );
if( false === $fullscreen_agency_enable_contact_section || empty( $fullscreen_agency_contact_page ) ) {
	return;
}
$fullscreen_agency_contact_title 		= get_theme_mod( 'fullscreen_agency_contact_title', __( 'Contact Us', 'fullscreen-agency' ) );
?>

	<div id="cv-contact-section" class="cv-fullpage-section cv-pink-gradient-bg cv-asfalt-light-bg-pattern">
		<div class="cv-container">
			<?php
				if( !empty( $fullscreen_agency_contact_title ) ) {
			?>
					<h2 class="section-title wow fadeInUp"><span><?php echo esc_html( $fullscreen_agency_contact_title ); ?></span></h2>
				<?php
					}
					if( !empty( $fullscreen_agency_contact_page ) ) {
                        echo '<div class="cv-contact-wrapper wow fadeInUp" data-wow-delay=0.6s>';
							$contact_args['page_id'] = absint( $fullscreen_agency_contact_page );
							$contact_query = new WP_Query( $contact_args );
							
							if( $contact_query->have_posts() ) :
								while( $contact_query->have_posts() ) : $contact_query->the_post(); ?>
								<div class="section-content-wrap">
									<?php the_content(); ?>
								</div><!-- .section-content-wrap -->
						<?php
								endwhile;
							endif;
						echo '</div><!-- .cv-contact-wrapper -->';
					}
				?>
		</div><!--.cv-container-->
   </div><!-- .cv-contact-section -->
	