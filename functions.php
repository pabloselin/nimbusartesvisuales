<?php
/**
 * nimbus functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package nimbus
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.3' );
}

if ( ! function_exists( 'nimbus_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function nimbus_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on nimbus, use a find and replace
		 * to change 'nimbus' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'nimbus', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'nimbus' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'nimbus_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'nimbus_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function nimbus_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'nimbus_content_width', 640 );
}
add_action( 'after_setup_theme', 'nimbus_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function nimbus_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'nimbus' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'nimbus' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'nimbus_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function nimbus_scripts() {
	wp_enqueue_style( 'nimbus-style', get_template_directory_uri() . '/build/index.css' , array(), _S_VERSION );

	wp_enqueue_script('nimbus-app', get_template_directory_uri() . '/build/index.js', ['wp-element', 'wp-api-fetch'], _S_VERSION, true);

	$frontpage = get_page(get_option('page_on_front'));

	wp_localize_script('nimbus-app', 'nimbus_app_data', array(
		'disciplina' 		=> nimbus_get_plainterms('disciplina'),
		'territorio'		=> nimbus_get_plainterms('territorio'),
		'site_name'			=> get_bloginfo( 'name' ),
		'artistslider'		=> nimbus_artistslider(),
		'site_description'	=> get_bloginfo( 'description' ),
		'frontpage'			=> array(
								'title' 	=> $frontpage->post_title, 
								'content'	=> apply_filters('the_content', $frontpage->post_content)
							),
		'menu'				=> nimbus_menu_items('principal'),
		'pages'				=> nimbus_get_pages_data(),
		'instagram'			=> get_option('instagram'),
		'facebook'			=> get_option('facebook'),
		'youtube'			=> get_option('youtube'),
		'email'				=> get_option('mail')
	));
}

add_action( 'wp_enqueue_scripts', 'nimbus_scripts' );

function nimbus_register_menu() {
	register_nav_menu( 'principal', 'Menú principal' );
}

function nimbus_get_pages_data() {
	$args = array(
		'post_type' 	=> 'page',
		'numberposts'	=> -1
	);

	$pages = get_posts($args);
	$pages_data = [];

	foreach($pages as $page) {
		
		$fields = ['nimbus_url_video', 'nimbus_duracion', 'nimbus_subtitulos'];

		$fields_data = [];

		foreach($fields as $field) {
			if(get_post_meta($page->ID, $field, true)) {
				$fields_data[$field] = 	get_post_meta($page->ID, $field, true);
			}	 
		}


		$pages_data[str_replace('-', '_', $page->post_name)] = array(
			'title'		=> $page->post_title,
			'fields'	=> $fields_data,
			'content'	=> apply_filters('the_content', $page->post_content),
			'video_id'	=> youtube_id_from_url(urldecode(rawurldecode(get_post_meta($page->ID, 'nimbusurl_video', true)))),
		);
	}

	return $pages_data;
}

function nimbus_menu_items($location) {
	$locations = get_nav_menu_locations();
	$menu = wp_get_nav_menu_object( $locations[$location] );
	$menuitems = wp_get_nav_menu_items($menu->term_id);

	return $menuitems;
}

add_action('after_setup_theme', 'nimbus_register_menu', 0);


function nimbus_get_plainterms($taxonomy) {
	$terms = get_terms(
			array( 	
				'taxonomy' 	=> $taxonomy,
				'parent'	=> 0
				)
			);
	$plainterms = [];
	
	foreach($terms as $term) {
		$plainterms[] = $term;
	}

	return $plainterms;
}

function nimbus_get_plainterms_item($itemid, $taxonomy) {
	$terms = get_the_terms( $itemid, $taxonomy );
	$plainterms = [];

	foreach($terms as $term) {
		$plainterms[] = $term->name;
	}

	return $plainterms;
}

function nimbus_get_plainterms_structured($itemid, $taxonomy) {
	$termstree = [];
	$topterms = get_the_terms($itemid, $taxonomy);

	foreach($topterms as $topterm) {
		if($topterm->parent == 0) {
			$subtermsarr = [];

			$subterms = get_terms( array( 
				'taxonomy'	=> $taxonomy,
				'parent' => $topterm->term_id
			));
			
			foreach($subterms as $subterm) {
				if(is_object_in_term( $itemid, $taxonomy, $subterm->term_id )) {
					$subtermsarr[] = $subterm->name;
				}
			}
			$termstree[] = array(
							'top' => $topterm->name,
							'subterms' => $subtermsarr
							);
		}
	}
	return $termstree;
}

function nimbus_fonts() {
	?>
	<!-- Google Fonts Stuff -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inconsolata:wght@400;700&display=swap" rel="stylesheet">
	<!-- End Google Fonts Stuff -->
	<?php

	}

add_action('wp_head', 'nimbus_fonts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
* Extend search to postmeta
**/

//require get_template_directory() . '/inc/extend-search.php';
