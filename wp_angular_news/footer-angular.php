<?php
/** @var ProRMSocial $social */
$social = Registry::get('social');
/** @var ProRMSettings $settings */
$settings = Registry::get('settings');

$sliders = ProRmSlider::getPublishedSliders();

$pll_current_language = pll_current_language();
?>


    </div>
<!-- footer -->
<footer id="footer">
    <div class="container">
        <div class="carousel-footer">
            <!-- cycle carousel structure example -->
            <div class="cycle-gallery">
                <div class="slideset">
                    <?php
                    // Template for slider
                    get_template_part('sliders');
                    ?>
                </div>
                <i class="btn-prev icon-left"></i>
                <i class="btn-next icon-right"></i>
            </div>
        </div>
        <ul class="list-links">
            <li><span class="copyright"><?php echo $settings->getOption('legal_copyright_text') ?></span></li>
            <?php ProRMTheme::showLegalPages(); ?>
        </ul>
        <ul class="social-networks">
            <?php if (pll_current_language() == 'en') : ?>
                <li><a target="_blank" href="<?php echo $settings->getOption('social_facebook_link_en') ?>" class="icon-facebook"></a></li>
                <li><a target="_blank" href="<?php echo $settings->getOption('social_twitter_link_en') ?>" class="icon-twitter"></a></li>
                <li><a target="_blank" href="<?php echo $settings->getOption('social_youtube_link_en') ?>" class="icon-youtube"></a></li>
            <?php elseif (pll_current_language() == 'de') : ?>
                <li><a target="_blank" href="<?php echo $settings->getOption('social_facebook_link_de') ?>" class="icon-facebook"></a></li>
                <li><a target="_blank" href="<?php echo $settings->getOption('social_twitter_link_de') ?>" class="icon-twitter"></a></li>
                <li><a target="_blank" href="<?php echo $settings->getOption('social_youtube_link_de') ?>" class="icon-youtube"></a></li>
            <?php endif; ?>
            <li><a target="_blank" href="<?php echo $settings->getOption('social_linkedin_link') ?>" class="icon-linkedin"></a></li>
        </ul>
    </div>
</footer>
<?php wp_footer(); ?>
<section class="session_block">
    <div class="container">
        <p class="text-block"><?= __('I accept that this site uses cookies for analysis, personalized content and advertisment.', ProRMTheme::TEXTDOMAIN); ?></p>
        <div class="right-block"><?php
            if (pll_current_language() == 'en') {
                $url = get_site_url() . '/en/privacy-and-cookies/';
            } else {
                $url = get_site_url() . '/de/datenschutz/';
            }?>
            <a href="<?= $url; ?>"><?= __('Learn more', ProRMTheme::TEXTDOMAIN); ?></a>
            <button class="session_btn btn" type="button"><img src="<?php echo ProRMTheme::url(); ?>/images/close-btn.png"></button>
        </div>
    </div>

</section>

</body>
</html>
    