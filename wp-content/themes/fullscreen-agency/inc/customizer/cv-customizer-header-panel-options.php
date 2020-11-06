<?php
/**
 * Fullscreen Agency manage the Customizer options of header panel.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

// Toggle field for Enable/Disable search icon.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_search_icon_opt',
		'label'    => esc_html__( 'Enable Search Menu', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_header_extra',
		'default'  => true,
		'priority' => 10,
	)
);

// repeater field for social icon
Kirki::add_field( 
	'fullscreen_agency_config', array(
		'type'        	=> 'repeater',
		'label'       	=> esc_html__( 'Add Social Icons here', 'fullscreen-agency' ),
		'description' 	=> esc_html__( 'Drag & Drop items to re-arrange the order', 'fullscreen-agency' ),
		'section'     	=> 'fullscreen_agency_section_header_extra',
		'priority'		=> 5,
		'row_label'   	=> array(
			'type'  => 'field',
			'value' => esc_html__( 'Social Icon', 'fullscreen-agency' ),
			'field' => 'social_icon',
		),
		'settings'    => 'fullscreen_agency_section_header_social_icon_lists',
		'choices'		=> array(
			'limit'		=> 5
		),
		'default'     => array(
			array(
				'social_icon' => 'facebook',
				'social_url'  => '#',
			),
			array(
				'social_icon' => 'twitter',
				'social_url'  => '#',
			),
		),
		'fields'      => array(
			'social_icon' => array(
				'type'    => 'select',
				'label'   => esc_html__( 'Social Icon', 'fullscreen-agency' ),
				'default' => 'facebook',
				'choices' => fullscreen_fontawesome_social_icons_lists(),
			),
			'social_url'  => array(
				'type'    => 'link',
				'label'   => esc_html__( 'Social Link URL', 'fullscreen-agency' ),
			),
		),
	)
);