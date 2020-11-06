<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

if ( ! function_exists( 'fullscreen_agency_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function fullscreen_agency_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf( $time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		echo '<span class="posted-on"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . wp_kses_post( $time_string ) . '</a></span>';

	}
endif;

if ( ! function_exists( 'fullscreen_agency_posted_by' ) ) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function fullscreen_agency_posted_by() {

		echo '<span class="byline"> <a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'; // WPCS: XSS OK.

	}
endif;

if ( ! function_exists( 'fullscreen_agency_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function fullscreen_agency_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'fullscreen-agency' ) );
			echo '<span class="cat-links">'. wp_kses_post( $categories_list ) .'</span>';

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'fullscreen-agency' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'fullscreen-agency' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'fullscreen-agency' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				)
			);
			echo '</span>';
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'fullscreen-agency' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif;

if ( ! function_exists( 'fullscreen_agency_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function fullscreen_agency_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="post-thumbnail">
				<?php the_post_thumbnail(); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

		<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
			<?php
			the_post_thumbnail( 'post-thumbnail', array(
				'alt' => the_title_attribute( array(
					'echo' => false,
				) ),
			) );
			?>
		</a>

		<?php
		endif; // End is_singular().
	}
endif;

/*-----------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_fontawesome_social_icons_lists' ) ) :
	/**
     * Font Awesome
     *
     * @param string $file_path font awesome css file path
     * @param string $class_prefix change this if the class names does not start with `fa-`
     * @return array
     */

	function fullscreen_fontawesome_social_icons_lists() {

		$social_icons_array = array( 'facebook-square', 'facebook', 'facebook-official', 'twitter-square', 'twitter', 'github', 'behance', 'behance-square', 'whatsapp', 'qq', 'wechat', 'weixin', 'tumblr', 'tumblr-square', 'instagram', 'google-plus-circle', 'google-plus-official', 'google-plus-square', 'google-plus', 'dribbble', 'skype', 'snapchat', 'snapchat-ghost', 'snapchat-square', 'pinterest', 'pinterest-square', 'pinterest-p', 'linkedin-square', 'linkedin', 'reddit', 'reddit-square', 'youtube-square', 'youtube', 'youtube-play', 'yelp' );

		foreach ( $social_icons_array as $icon ) {
			$icon_name = ucfirst( str_ireplace( array( '-' ), array( ' ' ), $icon ) );
			$font_awesome_icons[esc_attr( $icon )] = esc_html( $icon_name );
		}
		return $font_awesome_icons;
	}
endif;