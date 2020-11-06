<?php
/**
 * Fullscreen Agency manage the Customizer options of header panel.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

// Radio Image field for archive/blog sidebar layout.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'radio-image',
		'settings' => 'fullscreen_agency_archive_sidebar_layout',
		'label'    => esc_html__( 'Archive/Blog Sidebar Layout', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_archive_settings',
		'default'  => 'right-sidebar',
		'priority' => 5,
		'choices'  => array(
			'left-sidebar'  	 => get_template_directory_uri() . '/assets/images/left-sidebar.png',
			'right-sidebar' 	 => get_template_directory_uri() . '/assets/images/right-sidebar.png',
			'no-sidebar'         => get_template_directory_uri() . '/assets/images/no-sidebar.png',
			'no-sidebar-center'  => get_template_directory_uri() . '/assets/images/no-sidebar-center.png'
		),
	)
);


// Text filed for archive read more button.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_archive_read_more',
		'label'    => esc_html__( 'Read More Button', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_archive_settings',
		'default'  => esc_html__( 'Discover', 'fullscreen-agency' ),
		'priority' => 15,
	)
);


// Radio Image field for single posts sidebar layout.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'radio-image',
		'settings' => 'fullscreen_agency_posts_sidebar_layout',
		'label'    => esc_html__( 'Posts Sidebar Layout', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_post_settings',
		'default'  => 'right-sidebar',
		'priority' => 5,
		'choices'  => array(
			'left-sidebar'  	 => get_template_directory_uri() . '/assets/images/left-sidebar.png',
			'right-sidebar' 	 => get_template_directory_uri() . '/assets/images/right-sidebar.png',
			'no-sidebar'         => get_template_directory_uri() . '/assets/images/no-sidebar.png',
			'no-sidebar-center'  => get_template_directory_uri() . '/assets/images/no-sidebar-center.png'
		),
	)
);


// Radio Image field for single page sidebar layout.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'radio-image',
		'settings' => 'fullscreen_agency_pages_sidebar_layout',
		'label'    => esc_html__( 'Pages Sidebar Layout', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_page_settings',
		'default'  => 'right-sidebar',
		'priority' => 5,
		'choices'  => array(
			'left-sidebar'  	 => get_template_directory_uri() . '/assets/images/left-sidebar.png',
			'right-sidebar' 	 => get_template_directory_uri() . '/assets/images/right-sidebar.png',
			'no-sidebar'         => get_template_directory_uri() . '/assets/images/no-sidebar.png',
			'no-sidebar-center'  => get_template_directory_uri() . '/assets/images/no-sidebar-center.png'
		),
	)
);