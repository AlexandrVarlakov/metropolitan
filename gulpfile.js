const src_f = 'src';
const dist_f = 'dist';

const path = {
    src:{
        html: src_f + '/*.html',
        scss: [src_f + '/assets/scss/*.scss', '!'+ src_f + '/assets/scss/_*.scss'],
        js: src_f +   '/assets/js/*.js',
        fonts: src_f +   '/assets/fonts/**/*.*',
        img: src_f + '/assets/img/**/*.*',
        sound: src_f + '/assets/sound/**/*.*'
    }, 

    build: {
        html:  dist_f + '/',
        css: dist_f + '/assets/css/',
        js: dist_f +   '/assets/js/',
        fonts: dist_f +   '/assets/fonts/',
        img: dist_f + '/assets/img/',
        sound: dist_f + '/assets/sound/'
    },

    watch: {
        html: src_f + '/**/*.html',
        scss: src_f + '/assets/scss/**/*.scss',
        js: src_f +   '/assets/js/**/*.js',
        fonts: src_f +   '/assets/fonts/**/*.*',
        img: src_f + '/assets/img/*.*',
        sound: src_f + '/assets/sound/*.*'
    }
}

const gulp = require('gulp');
const {src, dest} = require('gulp');
const b_sync = require('browser-sync').create();
const sass = require('gulp-sass');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
//const minify = require('gulp-minify');
const rename = require('gulp-rename');
const minifycss = require('gulp-minify-css');


function browser_sync(){
    b_sync.init({
        server: {baseDir: 'dist/'}
    })
}

function html(){
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(b_sync.stream())
}

function css(){
    return src(path.src.scss)
        .pipe(sass())
        
        .pipe( autoprefixer({ overrideBrowserslist: ['last 15 versions']}))
        .pipe(dest(path.build.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(path.build.css))
        .pipe( b_sync.stream() )
}

function js(){
    return src(path.src.js)
        //.pipe(minify())
        .pipe(dest(path.build.js))
        .pipe( b_sync.stream() )
}

function fonts(){
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        
}

function img(){
    return src(path.src.img)
        .pipe(dest(path.build.img))
        
}
function sound(){
    return src(path.src.sound)
        .pipe(dest(path.build.sound))
        
}


function delete_dist(){
    return del(dist_f);
}

function watching(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
}

let build = gulp.series(delete_dist, html, css, js, fonts, img, sound);
let watch = gulp.parallel(build, watching, browser_sync);

exports.watch = watch;
exports.build = build;
exports.default = watch;