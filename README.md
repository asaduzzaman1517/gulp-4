# gulp-4
<h2>Pre Required</h2>
<ul>
  <li>Node.js + npm</li>
  <li>Gulp installed globally: npm install gulp --global</li>
</ul>

<h2>Usage</h2>
<ol>
  <h3><li>Clone repo</li></h3>
  <code>git clone https://github.com/asaduzzaman1517/gulp-4.git</code>
  <h3><li>Go inside cloned repo</li></h3>
  <code>cd gulp-4</code>
  <h3><li>Install all dependencies (make sure nodejs with npm is installed on your machine)</li></h3>
  <code>npm install</code>
  <h3><li>Run default gulp task (will open browser window with live reload)</li></h3>
  <code>gulp</code>
  <h3><li>List of npm packages used</li></h3>
  <ul>
    <li>
      <code>gulp 4</code>
    </li>
    <li>
      <code>browser-sync</code>
    </li>
    <li>
      <code>gulp-sourcemaps</code>
    </li>
    <li>
      <code>gulp-autoprefixer</code>
    </li>
    <li>
      <code>gulp-sass</code>
    </li>
      <li>
        <code>gulp-concat</code>
    </li>
      <li>
        <code>gulp-imagemin</code>
      <ul>
        <li>lossless compress</li>
        <li>lossy compress</li>
      </ul>
      </li>
      <li>
        <code>@babel for es6 code</code>
    </li>
      <li>
        <code>uglify</code>
    </li>
      <li>
        <code>gulp-line-ending-corrector</code>
    </li>
      <li>
        <code>clean</code>
    </li>
  </ul>
  <h3><li>Uses JS Vendor scripts</li></h3>
  
  In gulpfile.js find vendorJs variable and add relative path of your plugins (ex; jquery, bootstrap) See bellow:
  <br/><br/>
  <code>const vendorJs = [ <br/>
  "node_modules/package_name/package_script.js",<br/>
  "node_moduled/another_package_name/another_package_script.js"<br/>
    ]</code><br/>
    <h3><li>Uses JS Vendor scripts</li></h3>
  
  In gulpfile.js find vendorCssSrc variable and add relative path of your plugins (ex; jquery, bootstrap) See bellow:
  <br/><br/>
  <code>const vendorCssSrc = [ <br/>
  "node_modules/package_name/package_style.css",<br/>
  "node_moduled/another_package_name/another_package_style.scss"<br/>
    ]</code><br/>
</ol>
