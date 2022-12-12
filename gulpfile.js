const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const fileSync = require('gulp-file-sync');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');

const rem_files = [
  `${DIST_PATH}/**/*`,
  `!${DIST_PATH}/video/*.*`,
  `!${DIST_PATH}/img/*.*`
];

task('clean', () => {
  return src(rem_files, { read: false })
    .pipe(rm())
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

const res_files = [
  `${DIST_PATH}/video/*.*`,
  `${DIST_PATH}/img/*.*`
];

task('copy:img', () => {
  return src(`${SRC_PATH}/img/**/*.*`)
    .on('data', function (file) {
      console.log(file)
        .pipe(dest(`${DIST_PATH}/img/`))
        .pipe(reload({ stream: true }));
    })
})

task('styles', () => {
  return src([...STYLE_LIBS, 'src/styles/scss/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

// const libs = [
//   'node_modules/jquery/dist/jquery.js',
//   'src/scripts/*.js'
// ];

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src('src/images/icons/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/images/icons/*.svg', series('icons'));
  watch('./src/*.*',
    fileSync(`${SRC_PATH}/video`, `${DIST_PATH}/video`, { recursive: false }),
  );
  watch('./src/*.*',    
    fileSync(`${SRC_PATH}/img`, `${DIST_PATH}/img`, { recursive: true })
  );

});


task('default',
  series(
    'clean',
    parallel('copy:html', //'copy:img,'
      'styles', 'scripts', 'icons'),
    parallel('watch', 'server')
  )
);

task('build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'icons'))
);