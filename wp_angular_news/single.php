<?php
$current_page = get_post(pll_get_post(6));

$settings = Registry::get('settings');
$angular_mode =  $settings->getOption('angular_mode_news_enable');
if(!$angular_mode){
    
    get_header();
?>
<main id="main" role="main">
    <div id="content">
        <div class="container">
            <div class="news-holder">

                <ul class="list-links breadcrumbs">
                    <li><a href="<?php the_permalink($current_page->ID) ?>"><?php echo $current_page->post_title ?></a></li>
                    <!--<li><a href="<?php // echo get_category_link(get_the_category($post->ID)[0]->term_id)   ?>"><?php echo get_the_category($post->ID)[0]->cat_name ?></a></li>-->
                    <li class="active"><?php the_title() ?></li>
                </ul>
                <h1 class="h3 title-post"><?php the_title() ?></h1>

                <div class="page-post">
                    <?php
                    if (have_posts()) {
                        while (have_posts()) {
                            the_post();
                            if (has_post_thumbnail()) :
                                ?>
                                <div class="single-post-thumbnail">
                                    <a class="gallery-item" href="<?php the_post_thumbnail_url(); ?>" data-effect="mfp-zoom-in">
                                        <?php the_post_thumbnail(); ?>
                                    </a>
                                </div>
                                <?php
                            endif;
                            
                            
                            the_content();
                            $query_string_url = 'url=' . urlencode(get_permalink());
                            echo" <div class='xing-button'><a class='icon-item' href='https://www.xing.com/spi/shares/new?" . $query_string_url . "'></a></div>";
                            wp_link_pages(array(
                                'before' => '<div class="page-links"><span class="page-links-title">' . __('Pages:', ProRMTheme::TEXTDOMAIN) . '</span>',
                                'after' => '</div>',
                                'link_before' => '<span>',
                                'link_after' => '</span>',
                            ));
                        }
                    }
                    ?>
                    <div class="bottom-holder">
                        <a href="<?php print $_SERVER['HTTP_REFERER']; ?>" class="btn btn-news"><?= __( 'Back', ProRMTheme::TEXTDOMAIN ); ?></a>
                       
                    </div>
                </div>
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




