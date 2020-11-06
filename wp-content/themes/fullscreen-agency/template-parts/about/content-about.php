<?php
/**
 * Template part for displaying section of About Us content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

$fullscreen_agency_enable_about_us_section = get_theme_mod( 'fullscreen_agency_enable_about_us_section', true );

if( false === $fullscreen_agency_enable_about_us_section ) {
	return;
}

$fullscreen_agency_about_page = get_theme_mod( 'fullscreen_agency_about_page', '0' );

if( !empty( $fullscreen_agency_about_page ) ) {
	$page_args['page_id'] = absint( $fullscreen_agency_about_page );

	$page_query = new WP_Query( $page_args );

	if( $page_query->have_posts() ) {
?>
		<div id="cv-about-section" class="cv-fullpage-section cv-blue-gradient-bg cv-paper-fibers-bg-pattern" >
			<div class="cv-overlay">
				<div class="cv-container">
					<?php
						while( $page_query->have_posts() ) {
							$page_query->the_post();
							$thumb_image = get_the_post_thumbnail_url();
					?>		
								<div class="left-side">
									<div class="about-content-wrapper wow fadeInUp cv-clearfix" data-wow-delay="0.6s">
									<?php if( !empty( $thumb_image ) ){ ?>
											<div class="thumb-image">
												<?php the_post_thumbnail(); ?>
											</div>
										<?php } ?>
										<div class="about-content-block <?php if( empty( $thumb_image ) ){ echo 'no-thumb-image'; } ?>">
											<h2 class="section-title"><span><?php the_title(); ?></span></h2>
											<div class="about-content">
												<?php the_content(); ?>
											</div>
											<a href="<?php esc_url( the_permalink() ); ?>" class="about-btn"> <?php echo esc_html ( 'Read More', 'fullscreen-agency-pro' ); ?> <i class="fa fa-long-arrow-right"> </i> </a>
										</div><!-- .about-content-block -->
									</div><!-- .about-content-wrapper -->
								</div><!-- .left-side -->
				<?php
						}
					?>
				</div><!--cv-container-->
			</div>
		</div><!-- #cv-about-section -->
<?php
	}
}