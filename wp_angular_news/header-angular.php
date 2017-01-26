<!DOCTYPE html>
<html >
<head>
    <base href="/">
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow"/>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <link rel="icon" href="<?php echo ProRMTheme::url(); ?>/images/favicon.ico" type="image/png" />

    <title>AngularJS Demo News</title>
	
    <?php wp_head(); ?>
    
</head>

<body>
    
    
        
    <?php $dataCurLang = pll_current_language('slug');
        session_set_cookie_params(10800);
       
    ?>
    
    <div id="wrapper" style="display:block;" class="angular <?php //echo $dataCurLang; ?>">
    
        <header id="header">
            <div class="container">
                <div class="logo">

                    <?php if(!is_front_page()){ ?>
                        <a href="<?php echo pll_home_url(); ?>">
                    <?php } else{ ?>
                        <div>    
                    <?php } ?>
                        <img src="<?php echo ProRMTheme::url(); ?>/images/logo.png" 
                             alt="<?php echo $header_alt ? $header_alt : $general_alt ; ?>">
                    <?php if(!is_front_page()){ ?>
                        </a>
                    <?php } else{ ?>
                        </div>    
                    <?php } ?>

                </div>
                <nav class="menu">
                    <ul id="nav" class="nav-drop">
                        <?php ProRMTheme::showSideMenu(); ?>
                    </ul>
                </nav>
                <a href="#" class="nav-opener"><span></span></a>
                <?php echo ProRMTheme::getLangSwitcher(); ?>
            </div>
        </header>