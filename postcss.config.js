module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: [
    require('postcss-at-rules-variables')({ /* atRules: ['media'] */ }),
    require('postcss-each')(),
    require('postcss-import')({
      plugins: [
        require('postcss-at-rules-variables')({ /* options */ }),
        require('postcss-import')
      ]
    }),
    require('postcss-for')(),
    require('postcss-conditionals')(),
    require('postcss-custom-properties')(),
    require('postcss-nested')(),
    require('postcss-mixins')(),
    require('cssnano')({
      autoprefixer : {
        add      : true,
        remove   : true,
        browsers : ['last 2 versions']
      },
      discardComments : {
        removeAll : true
      },
      discardUnused : false,
      mergeIdents   : false,
      reduceIdents  : false,
      safe          : true,
      sourcemap     : true
    })
  ]
})
