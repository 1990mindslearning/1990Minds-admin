const CracoLessPlugin = require('craco-less');


module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#001529',
            //  '@select-border-color':"#3498DB",
            //  '@input-border-color':"#3498DB",
             '@input-bg':"#FFF",
             '@picker-bg':"#FFF",
             '@input-icon-color':"#f7f7f7",
             '@table-expanded-row-bg':"#001529",
             '@body-background':'#001529',
             '@input-height-base': '36px',
             '@border-radius-base':'4px',
             '@border-color-base':'#001529',
             '@box-shadow-base':'0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            '@font-family':'"Poppins", sans-serif',
            '@font-size-base':'16px',
            '@modal-heading-color': '#001529',
            '@btn-disable-border':'0px solid #fff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
   
      ]
    },
  },
};