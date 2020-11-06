<?php
/**
 * Template part for displaying section of portfolio content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

$fullscreen_agency_enable_portfolio_section = get_theme_mod( 'fullscreen_agency_enable_portfolio_section', true );
$fullscreen_agency_porfolio_cat 			= get_theme_mod( 'fullscreen_agency_porfolio_cat', '' );
if( false === $fullscreen_agency_enable_portfolio_section || empty( $fullscreen_agency_porfolio_cat ) ) {
	return;
}

$fullscreen_agency_portfolio_title 		= get_theme_mod( 'fullscreen_agency_portfolio_title', __( 'Portfolio', 'fullscreen-agency' ) );
$fullscreen_agency_portfolio_count 		= apply_filters( 'fullscreen_agency_portfolio_count', 6 );

?>
	<div id="cv-portfolio-section" class="cv-fullpage-section cv-yellow-gradient-bg cv-brushed-alum-dark-bg-pattern">
		<div class="cv-container">
			<div class="cv-portfolio">
				<?php
					if( !empty( $fullscreen_agency_portfolio_title ) ) {
				?>
						<h2 class="section-title"><span><?php echo esc_html( $fullscreen_agency_portfolio_title ); ?></span></h2>
				<?php
					}
				?>	
				<div class="cv-column-wrapper">
					<?php
						if( !empty( $fullscreen_agency_porfolio_cat ) ) {
							$portfolio_args = array(
									'post_type' 	 => 'post',
									'category_name'	 => esc_attr( $fullscreen_agency_porfolio_cat ),
									'posts_per_page' => absint( $fullscreen_agency_portfolio_count ),
								);

							$portfolio_query = new WP_Query( $portfolio_args );
							if( $portfolio_query->have_posts() ){
								$wow_delay = 0; ?>
								<div class="cv-portfolio-wrapper cv-portfolio--masonry">
									<div id="cv-masonry">
									<?php
										while( $portfolio_query->have_posts() ) {
											$portfolio_query->the_post();
											$wow_delay = $wow_delay + 0.2;
											if( has_post_thumbnail() ) {
									?>
												<div class="single-portfolio-wrap cv-column-3 wow fadeInUp" data-wow-delay = <?php echo esc_attr( $wow_delay ).'s'; ?>>
													<div class="portolio-image-wrap">							
														<figure><?php the_post_thumbnail( 'portfolio-size' ); ?></figure>
														<div class="portfolio-content-wrap cv-overlay">
														<h3 class="portfolio-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
														</div><!--portfolio-content-wrap-->
													</div><!-- .portfolio-image-wrap -->
												</div><!-- .single-service-wrap -->
									<?php
											}
										}
									?>
									</div><!-- #cv-masonry -->
								</div><!-- .cv-portfolio-wrapper -->
					<?php
							}
							wp_reset_postdata();
						}
					?>
				</div><!--.cv-column-wrapper-->
			</div><!-- .cv-portfolio-->
		</div><!--.container-->
	</div><!-- .cv-portfolio-section -->