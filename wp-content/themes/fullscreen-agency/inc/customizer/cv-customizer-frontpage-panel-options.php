<?php
/**
 * Fullscreen Agency manage the Customizer options of frontpage panel.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

// Toggle field for Enable/Disable hero content
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_hero_section',
		'label'    => esc_html__( 'Enable Hero Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_hero_content',
		'default'  => '1',
		'priority' => 5,
	)
);

// Image field for hero image
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'image',
		'settings'    => 'fullscreen_agency_hero_image',
		'label'       => esc_attr__( 'Hero Image', 'fullscreen-agency' ),
		'description' => esc_attr__( 'Click "Select image" to upload an image file from your computer. Recommended an image size of 1920 × 850 pixels for perfect fit.', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_hero_content',
		'default'     => esc_url(  get_template_directory_uri() . '/assets/images/hero.jpg' ),
		'priority' 	  => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_hero_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Text field for hero title
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_hero_title',
		'label'    => esc_html__( 'Hero Title', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_hero_content',
        'default'  => esc_html( 'Get Your Dream Work', 'fullscreen-agency' ),
		'priority' => 15,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_hero_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Textarea field for hero content
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'textarea',
		'settings' => 'fullscreen_agency_hero_content',
		'label'    => esc_html__( 'Hero Content', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_hero_content',
        'default'  => esc_html( 'The driving force of a career must come from the individual. Remember: Jobs are owned by the company, you own your career!', 'fullscreen-agency' ),
		'priority' => 20,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_hero_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Text field for hero content button label
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_hero_button_label',
		'label'    => esc_html__( 'Hero Button Label', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_hero_content',
        'default'  => esc_html( 'Work Now', 'fullscreen-agency' ),
		'priority' => 25,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_hero_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Link field for hero content button link
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_hero_button_link',
		'label'    => esc_html__( 'Hero Button Link', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_hero_content',
        'default'  => esc_url( '#', 'fullscreen-agency' ),
		'priority' => 30,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_hero_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Toggle field for Enable/Disable About Us Section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_about_us_section',
		'label'    => esc_html__( 'Enable About Us Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_about_us',
		'default'  => '1',
		'priority' => 5,
	)
);

// Dropdown pages field for about us section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'dropdown-pages',
		'settings'    => 'fullscreen_agency_about_page',
		'label'       => esc_attr__( 'Select Page', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_about_us',
		'default'     => 0,
		'priority'    => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_about_us_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Toggle field for Enable/Disable Services Section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_services_section',
		'label'    => esc_html__( 'Enable Services Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_services',
		'default'  => '1',
		'priority' => 5,
	)
);

// Text field for service section title
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_service_title',
		'label'    => esc_html__( 'Section Title', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_services',
		'default'  => esc_html__( 'Services', 'fullscreen-agency' ),	
		'priority' => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_services_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Select field for service section categories.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'select',
		'settings'    => 'fullscreen_agency_service_cat',
		'label'       => esc_attr__( 'Select Category', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_services',
		'default'     => '',
		'priority'    => 15,
		'choices'     => fullscreen_agency_select_categories_list(),
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_services_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);


// Text field for service read more button
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_service_more_button',
		'label'    => esc_html__( 'Read More Button', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_services',
		'default'  => esc_html__( 'Read More', 'fullscreen-agency' ),	
		'priority' => 20,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_services_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Toggle field for Enable/Disable Portfolio Section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_portfolio_section',
		'label'    => esc_html__( 'Enable Portfolio Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_portfolio',
		'default'  => '1',
		'priority' => 5,
	)
);

// Text field for portfolio section title
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_portfolio_title',
		'label'    => esc_html__( 'Section Title', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_portfolio',
		'default'  => esc_html__( 'New Projects', 'fullscreen-agency' ),	
		'priority' => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_portfolio_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Select field for portfolio section categories.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'select',
		'settings'    => 'fullscreen_agency_porfolio_cat',
		'label'       => esc_attr__( 'Select Category', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_portfolio',
		'default'     => '',
		'priority'    => 15,
		'choices'     => fullscreen_agency_select_categories_list(),
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_portfolio_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Toggle field for Enable/Disable Testimonial Section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_testimonial_section',
		'label'    => esc_html__( 'Enable Testimonial Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_testimonial',
		'default'  => '1',
		'priority' => 5,
	)
);

// Text field for testimonial section title
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_testimonial_title',
		'label'    => esc_html__( 'Section Title', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_testimonial',
		'default'  => esc_html__( 'Testimonials', 'fullscreen-agency' ),	
		'priority' => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_testimonial_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Select field for testimonial section categories.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'select',
		'settings'    => 'fullscreen_agency_testimonial_cat',
		'label'       => esc_attr__( 'Select Category', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_testimonial',
		'default'     => '',
		'priority'    => 15,
		'choices'     => fullscreen_agency_select_categories_list(),
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_testimonial_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Toggle field for Enable/Disable Blog Section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_blog_section',
		'label'    => esc_html__( 'Enable Blog Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_blog',
		'default'  => '1',
		'priority' => 5,
	)
);

// Text field for blog section title
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_blog_title',
		'label'    => esc_html__( 'Section Title', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_blog',
		'default'  => esc_html__( 'Latest News', 'fullscreen-agency' ),	
		'priority' => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_blog_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Select field for blog section categories.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'select',
		'settings'    => 'fullscreen_agency_blog_cat',
		'label'       => esc_attr__( 'Select Category', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_blog',
		'default'     => '',
		'priority'    => 15,
		'choices'     => fullscreen_agency_select_categories_list(),
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_blog_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Text field for blog read more button
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_blog_more_button',
		'label'    => esc_html__( 'Read More Button', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_blog',
		'default'  => esc_html__( 'Read More', 'fullscreen-agency' ),	
		'priority' => 20,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_blog_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Toggle field for Enable/Disable Contact Section
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_contact_section',
		'label'    => esc_html__( 'Enable Contact Section', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_contact',
		'default'  => '1',
		'priority' => 5,
	)
);

// Text field for contact section title
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'text',
		'settings' => 'fullscreen_agency_contact_title',
		'label'    => esc_html__( 'Section Title', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_contact',
		'default'  => esc_html__( 'Contact Us', 'fullscreen-agency' ),	
		'priority' => 10,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_contact_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);

// Select field as page for contact section.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'dropdown-pages',
		'settings'    => 'fullscreen_agency_contact_page',
		'label'       => esc_attr__( 'Select Page', 'fullscreen-agency' ),
		'section'     => 'fullscreen_agency_section_contact',
		'default'	  => 0,
		'priority'    => 15,
		'active_callback' => array(
			array(
				'setting'  => 'fullscreen_agency_enable_contact_section',
				'value'    => true,
				'operator' => 'in',
			),
		)
	)
);