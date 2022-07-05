const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const jsmin = require('gulp-jsmin');
const svgo = require('gulp-svgo');
const cache = require('gulp-cached');
const clean = require('gulp-clean');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(cache('sass'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
            browsers: [
              'Android >= 4',
              'Chrome >= 20',
              'Firefox >= 24',
              'Explorer >= 11',
              'iOS >= 6',
              'Opera >= 12',
              'Safari >= 6',
            ],
            cascade: false
          }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass|css)", gulp.parallel("styles"))
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/img/**/*").on('change', gulp.parallel('images'));
    gulp.watch("src/svg/**/*").on('change', gulp.parallel('svg'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('js'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('js', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(cache('js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts/"));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(cache('icons'))
        .pipe(gulp.dest("dist/icons/"));
});

gulp.task('images', function() {
    return gulp.src("src/img/**/*")
        .pipe(cache('images'))
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img/"));
});

gulp.task('clean_images', function() {
    return gulp.src("dist/img/**/*", {read: false})
        .pipe(clean())
});

gulp.task('clean_svgs', function() {
    return gulp.src("dist/svg/**/*", {read: false})
        .pipe(clean())
});

gulp.task('svg', function() {
    return gulp.src("src/svg/**/*")
        .pipe(cache('svg'))
        .pipe(svgo())
        .pipe(gulp.dest("dist/svg/"));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'js', 'fonts', 'icons', 'clean_images', 'images', 'clean_svgs', 'svg'));
