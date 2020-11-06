<?php
/**
 * Template part for displaying single posts content.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
	if ( 'post' === get_post_type() ) :
		?>
		<div class="entry-meta">
			<?php
			fullscreen_agency_posted_on();
			fullscreen_agency_posted_by();
            fullscreen_agency_entry_footer();
			?>
		</div><!-- .entry-meta -->
	<?php endif; ?>

	<div class="entry-content">
		<?php
		the_content( sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'fullscreen-agency' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			get_the_title()
		) );

		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'fullscreen-agency' ),
			'after'  => '</div>',
		) );
		?>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->
