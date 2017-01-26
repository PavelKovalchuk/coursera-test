<?php

$settings = Registry::get('settings');
$angular_mode =  $settings->getOption('angular_mode_news_enable');
if(!$angular_mode){
?>
<?php 
get_header();
$current_page = get_post(pll_get_post(6));
$page_id = $current_page->ID;
?>
    <main id="main" role="main">
        <div id="content">
            <div class="banner top-banner">
                <div class="container">
                    <div class="banner-image"><img  src="<?php echo the_cfc_field( 'newsroom', 'header_image', $page_id ); ?>" alt="img description"></div>
                    <div class="banner-text">
                        <p><?php echo the_cfc_field( 'newsroom', 'header_text', $page_id ); ?></p>
                    </div>
                </div>
            </div>
            <div class="container">
                <ul class="list-links breadcrumbs">
                    <li><a href="<?php the_permalink($current_page->ID) ?>"><?php echo $current_page->post_title ?></a></li>
                    <li><?php single_cat_title() ?></li>
                </ul>

            </div>
            <div class="newsroom-posts">s
                <div class="container">
                    <p class="third-header-section"><?php single_cat_title() ?></p>
                    
                    <?php // get_template_part('parts/newsroom/category-filter'); ?>

                    <?php
                        if (have_posts()) {
                            while (have_posts()) {
                                the_post();
                                ProRMNews::showNewsItem(array(
                                    'title' => true,
                                    'categories' => false,
                                    'thumbnail' => false,
                                    'excerpt' => true,
                                    'content' => false,
                                    'read_more' => true,
                                    'read_more_text' => __('more', ProRMTheme::TEXTDOMAIN)
                                ));
                            }
                        }
                    ?>

                    <?php get_template_part('parts/common/content-nav'); ?>


                </div>
            </div>
        </div>
    </main>

<?php get_footer(); ?>

<?php }else { 


    get_header('angular');
 ?>   
 
    
    <div ng-app="app">
           
        <div ui-view autoscroll="true"></div>
    </div>


<?php get_footer('angular'); ?>
    
<?php } ?>