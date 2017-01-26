<?php

function angular_scripts() {
	if ( is_page_template('templates/news-page-angular.php') || is_single() || is_category(array(475,13))) {
            
            $default_posts_per_page = get_option( 'posts_per_page' );
            $dateFormat = get_option('date_format');
            $post_url = $_SERVER['REQUEST_URI'];
                    
            if(is_single()){
                $post_url = $_SERVER['REQUEST_URI'];
            }
            
//            wp_dequeue_style( 'magnific-css');
//            wp_dequeue_style( 'owl-style-css');
//            wp_deregister_script( 'magnific-popup');
//            wp_deregister_script( 'owl.carousel-js');
//            wp_deregister_script( 'main' );
//            wp_deregister_script( 'custom');
            
            
            wp_enqueue_script(
                    'angularjs',
                    get_stylesheet_directory_uri() . '/node_modules/angular/angular.min.js',
                    array('jquery'),
                    false, 
                    true
            );
            wp_enqueue_script(
                    'angularjs-route',
                    get_stylesheet_directory_uri() . '/node_modules/angular-route/angular-route.min.js',
                    array('jquery'),
                    false, 
                    true
            );
            wp_register_script(
		'angularjs-sanitize',
		get_stylesheet_directory_uri() . '/node_modules/angular-sanitize/angular-sanitize.min.js',
                array( 'angularjs'),
                false, 
                true
            );
            
            wp_enqueue_script(
		'angular-ui-router',
		get_stylesheet_directory_uri() . '/node_modules/angular-ui-router/release/angular-ui-router.min.js',
		array( 'angularjs', 'angularjs-route','angularjs-sanitize' ),
                false, 
                true
            );
            
            wp_enqueue_script(
		'custom-angular',
		get_stylesheet_directory_uri() . '/angular/js/custom-angular.js',
		array( 'angularjs', 'angular-ui-router','angularjs-sanitize' ),
                false, 
                true
            );
            
             wp_enqueue_style(
		'custom-angular-css',
		get_stylesheet_directory_uri() . '/angular/css/style.css'
		
            );
            
            
            wp_localize_script(
                    'custom-angular',
                    'WPOptions',
                    array(
                        'partials' => trailingslashit( get_template_directory_uri() ) . 'angular/partials/',
                        'postsPerPage' => $default_posts_per_page,
                        'dateFormat' => $dateFormat,
                        'postUrl' => $post_url
                        
                    )
            );
        
            
            
        }
}
add_action( 'wp_enqueue_scripts', 'angular_scripts' );



function prorm_rest_post_query( $args, $request ) {

        if ( isset( $request['filter'] ) && isset( $request['filter']['posts_per_page'] ) && ! empty( $request['filter']['posts_per_page'] ) ) {
            
            $posts_per_page = intval($request['filter']['posts_per_page']);

            if ( $posts_per_page > 0 && $posts_per_page < 500) {
                $args['posts_per_page'] = $request['filter']['posts_per_page'];
            } else {
                $args['posts_per_page'] = get_option( 'posts_per_page' );
            }
	} 
   
	return $args;
}
add_filter( 'rest_post_query', 'prorm_rest_post_query', 10, 2 );





function angular_rest_prepare_post( $data, $post, $request ) {
	$_data = $data->data;
        
        $post_meta = get_post_meta($post->ID);
	
//Featured image	
        $thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
    $_data['featured_image_thumbnail_url'] = $thumbnail[0];
    
//For translated post        
        $cat_ID = $_data['categories'][0];
        
        $current_lang = get_current_post_lang($cat_ID);
        
    $_data['current_lang'] = $current_lang;
        
        $translated_lang = get_translated_post_lang($cat_ID);
     
        $post_translated_id =  pll_get_post($post->ID, $translated_lang);

        $post_translated_slug = get_post_field( 'post_name', intval($post_translated_id), 'db' );

        $post_translated_info = array('post_translated_id' => $post_translated_id, 
                                  'translated_language' =>  $translated_lang, 
                                  'post_translated_slug' =>  $post_translated_slug,
                                   'current_post_id' =>  $post->ID
                                   );
        
    $_data['translation_post'] = $post_translated_info;

//For SEO data
    
    
        $post_title = $post_meta['_aioseop_title'][0];

        $post_description = $post_meta['_aioseop_description'][0];

        $post_seo_info = array('seo_title' => $post_title, 
                            'seo_description' =>  $post_description,
                            );
    $_data['seo_data'] = $post_seo_info;
    
//For permalink data
    
    $_data['permalink_data'] = get_permalink_data( $post->ID );    
        
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'angular_rest_prepare_post', 10, 3 );




function angular_rest_prepare_page( $data, $post, $request ) {
	$_data = $data->data;
        
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
        $post_meta = get_post_meta($post->ID);
        
	$_data['featured_image_thumbnail_url'] = $thumbnail[0];

        $_data['header_image_path'] =  get_cfc_field( 'newsroom', 'header_image', $post->ID )['url'];
        $_data['header_image_alt'] = get_cfc_meta( 'newsroom', $post->ID )[0]["header_image_alt"];
        $_data['header_text'] = get_cfc_field( 'newsroom', 'header_text', $post->ID );
        $_data['headline'] = get_cfc_field( 'newsroom', 'headline', $post->ID );
        
        $_data['category_posts'] = get_field( "categories_for_posts", $post->ID );
        $_data['cat_posts_ids'] = angular_get_post_ids($_data['category_posts']);
        
        
        
        $post_title = $post_meta['_aioseop_title'][0];
    
        $post_description = $post_meta['_aioseop_description'][0];
        
        $post_keywords = $post_meta['_aioseop_keywords'][0];
    
        
        $_data['page_seo_info'] = array('seo_title' => $post_title, 
                            'seo_description' =>  $post_description,
                            'seo_keywords' =>  $post_keywords,
                            );
        
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_page', 'angular_rest_prepare_page', 10, 3 );


function get_translated_post_lang($cat_id){
    
    if($cat_id == 475){
        return 'de';
    }
    elseif($cat_id == 13){
        return 'en';
    }
//    else{
//        return 'de';
//    }
    
}

function get_current_post_lang($cat_id){
    
    if($cat_id == 475){
        return 'en';
    }
    elseif($cat_id == 13){
        return 'de';
    }
//    else{
//        return 'de';
//    }
    
}

function get_permalink_data( $post_id ) {
    
    $url =  get_permalink($post_id); 
    $url_path = parse_url($url)["path"];
    $urlData = explode("/", $url_path);
    $urlReverse = array_reverse($urlData);
    $url_month = $urlReverse[2];
    $url_year = $urlReverse[3];
      
        
    $post_permalink_info = array('permalink_month' =>  $url_month, 
                            'permalink_year' =>  $url_year
                            );
    
    return $post_permalink_info;
      
}


function angular_get_post_ids($cat, $taxonomy='category')
{
    return get_posts(array(
        'numberposts'   => -1, // get all posts.
        'tax_query'     => array(
            array(
                'taxonomy'  => $taxonomy,
                'field'     => 'id',
                'terms'     => is_array($cat) ? $cat : array($cat),
            ),
        ),
        'fields'        => 'ids', // only get post IDs.
    ));
}



//Show a post meta field in post responses
//Returns the post (or page) translation

//    add_action( 'rest_api_init', 'register_translation_post' );
//    function register_translation_post() {
//        register_rest_field( 
//                'post',
//                'translation_post',
//                array(
//                    'get_callback'    => 'get_translation_post',
//                    'update_callback' => null,
//                    'schema'          => null,
//                )
//        );
//    }

/**
 * Returns the post (or page) translation
 *
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
//    function get_translation_post( $object, $field_name, $request ) {
//    //    return get_post_meta( $object[ 'id' ], $field_name, true );
//        $lang_slug = get_translated_post_lang($object[ 'categories' ][0]);
//
//        $post_translated_id =  pll_get_post($object[ 'id' ], $lang_slug);
//
//        $post_translated_slug = get_post_field( 'post_name', intval($post_translated_id), 'db' );
//
//        $post_translated_info = array('post_translated_id' => $post_translated_id, 
//                                      'current_post_lang_slug' =>  $lang_slug, 
//                                      'post_translated_slug' =>  $post_translated_slug,
//                                       'current_post_id' =>  $object[ 'id' ]
//                                       );
//
//        return $post_translated_info;
//
//    }


//Show a post meta field in post responses
//Returns the post (or page) SEO

//    add_action( 'rest_api_init', 'register_seo_post' );
//    function register_seo_post() {
//        register_rest_field( 
//                'post',
//                'seo_data',
//                array(
//                    'get_callback'    => 'get_seo_post',
//                    'update_callback' => null,
//                    'schema'          => null,
//                )
//        );
//    }

//    function get_seo_post( $object, $field_name, $request ) {
//
//        $post_meta = get_post_meta($object[ 'id' ]);
//
//        $post_title = $post_meta['_aioseop_title'][0];
//
//        $post_description = $post_meta['_aioseop_description'][0];
//
//
//        $post_seo_info = array('seo_title' => $post_title, 
//                                'seo_description' =>  $post_description,
//                                );
//
//        return $post_seo_info;
//
//    }




//Show a post meta field in post responses
//Returns the post (or page) permalink data

//    add_action( 'rest_api_init', 'register_permalink_data' );
//    function register_permalink_data() {
//        register_rest_field( 
//                'post',
//                'permalink_data',
//                array(
//                    'get_callback'    => 'get_permalink_data2',
//                    'update_callback' => null,
//                    'schema'          => null,
//                )
//        );
//    }
//
//    function get_permalink_data2( $object, $field_name, $request ) {
//
//        $url =  get_permalink($object[ 'id' ]); 
//        $url_path = parse_url($url)["path"];
//        $urlData = explode("/", $url_path);
//        $urlReverse = array_reverse($urlData);
//        $url_month = $urlReverse[2];
//        $url_year = $urlReverse[3];
//
//
//        $post_permalink_info = array('permalink_month' =>  $url_month, 
//                                'permalink_year' =>  $url_year
//                                );
//
//        return $post_permalink_info;
//
//    }




//function showPubDateNews($post_id)
//    {
//        $dateFormat = get_option('date_format');
//        $dateString = '';
//        if (function_exists('pll_current_language')) {
////            if(pll_current_language('slug') == 'de'){
////                $dateFormat = 'j. M. Y';
////                $dateArr = explode('.', get_the_date($dateFormat, $post_id));
////                $dateArr[1] = __(trim($dateArr[1]), ProRMTheme::TEXTDOMAIN);
////                $dateString = $dateArr[0] . '. ' . $dateArr[1] . ' ' . $dateArr[2];
////            }
//        }
//        if(!$dateString){
//            $dateString = get_the_date($dateFormat, $post_id);
//        }
//   
//       
//        $response = [
//            'date' => esc_attr(get_the_date('c')),
//            'date_formatted' => esc_html($dateString)
//        ];
//        
//        return $response;
//        
//    }
