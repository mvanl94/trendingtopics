<?php
/**
* Template part for displaying section of testimonial content
*
* @link https://developer.wordpress.org/themes/basics/template-hierarchy/
*
* @package CodeVibrant
* @subpackage Fullscreen Agency
* @since 1.0.0
*/

$fullscreen_agency_enable_testimonial_section = get_theme_mod( 'fullscreen_agency_enable_testimonial_section', true );
$fullscreen_agency_testimonial_cat    = get_theme_mod( 'fullscreen_agency_testimonial_cat', '' );
if( false === $fullscreen_agency_enable_testimonial_section || empty( $fullscreen_agency_testimonial_cat )) {
    return;
}

$fullscreen_agency_testimonial_title  = get_theme_mod( 'fullscreen_agency_testimonial_title', __( 'Testimonial', 'fullscreen-agency' ) );
$fullscreen_agency_testimonial_count  = apply_filters( 'fullscreen_agency_testimonial_count', 5 );

?>
<div id="cv-testimonial-section" class="cv-fullpage-section cv-crimson-gradient-bg cv-asfalt-light-bg-pattern" >
    <div class="cv-container">
        <div class="cv-column-wrapper">
            <div class="post-content-wrapper">
                <?php
                    if( !empty( $fullscreen_agency_testimonial_title ) ) {
                ?>
                        <h2 class="section-title wow fadeInUp"><span><?php echo esc_html( $fullscreen_agency_testimonial_title ); ?></span></h2>
                <?php } ?>
                    <div class="cv-testimonial-wrapper">
                        <?php
                            if( !empty( $fullscreen_agency_testimonial_cat ) ) {

                                $testimonial_args = array(
                                    'post_type'      => 'post',
                                    'category_name'     => esc_attr( $fullscreen_agency_testimonial_cat ),
                                    'posts_per_page' => absint( $fullscreen_agency_testimonial_count ),
                                ); ?>
                                <div class="thumb-image-list">
                                    <?php $testimonial_query = new WP_Query( $testimonial_args );
                                    if( $testimonial_query->have_posts() ) :
                                        $wow_delay = 0.2;
                                        while( $testimonial_query->have_posts() ) :
                                            $testimonial_query->the_post();
                                            $wow_delay = $wow_delay+0.3; ?>
                                            <div class="thumb-image-block wow pulse" data-wow-iteration="1" data-wow-delay=<?php echo esc_attr( $wow_delay ).'s'; ?> data-filter ="<?php echo esc_attr( $post->post_name ); ?>">
                                                <div class="thumb-img">
                                                   <?php if( has_post_thumbnail() ) { the_post_thumbnail( 'testimonial-size' ); } ?>
                                                </div><!-- .thumb-img -->
                                            </div> <!-- .thumb-image block -->
                                    <?php endwhile; endif; wp_reset_postdata(); ?>
                            	</div>
                        <?php 
                                $i=0;
                                if( $testimonial_query->have_posts() ) {
                                    while( $testimonial_query->have_posts() ) {
                                        $testimonial_query->the_post();
                        ?>
                                        <div <?php if( $i!=0 ){ ?>style="display: none;" <?php } ?> class="single-testimonial-member-wrap cv-clearfix <?php echo esc_attr( $post->post_name ); ?>">
                                        	<div class="thumb-display-image wow fadeInUp">
                                                <?php if( has_post_thumbnail() ) { the_post_thumbnail( 'testimonial-size' ); } ?>
                                            </div>
                                                <div class="image-content wow fadeInUp" data-wow-delay = "0.6s">
                                                	<h3 class="member-name"><?php the_title(); ?></h3>
                                               		<div class="member-info"><?php the_excerpt(); ?></div>
                                                </div>
                                        </div><!-- .single-testimonial-member-wrap -->
                        <?php
                                $i++;
                                    }
                                }
                                wp_reset_postdata();
                            }
                        ?>
                    </div><!-- .cv-testimonial-wrapper -->
                </div><!-- .post-content-wrapper -->
            </div><!--cv-column-wrapper-->
        </div><!--container-->
    </div><!-- #cv-testimonial-section -->