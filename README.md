# Documentation of INPT

This github repository stores the Github Pages website documenting the bash script project INPT: https://eddycolloton.github.io/Documentation_INPT/

INPT is an open source project created for TBMA processing at HMSG. To view the repository for INPT, please go here: https://github.com/eddycolloton/INPT 

### The Time machine theme

The website is based on the github pages template time machine: https://github.com/pages-themes/time-machine

[![.github/workflows/ci.yaml](https://github.com/pages-themes/time-machine/actions/workflows/ci.yaml/badge.svg)](https://github.com/pages-themes/time-machine/actions/workflows/ci.yaml) [![Gem Version](https://badge.fury.io/rb/jekyll-theme-time-machine.svg)](https://badge.fury.io/rb/jekyll-theme-time-machine)

*Time machine is a Jekyll theme for GitHub Pages. You can [preview the theme to see what it looks like](http://pages-themes.github.io/time-machine), or even [use it today](#usage).*

![Thumbnail of Time machine](thumbnail.png)

### Previewing the theme locally

If you'd like to preview the theme locally (for example, in the process of proposing a change):

1. `cd` into the theme's directory
2. Run `script/bootstrap` to install the necessary dependencies
3. Run `bundle exec jekyll serve` to start the preview server
4. Visit [`localhost:4000`](http://localhost:4000) in your browser to preview the theme

### Running tests

The theme contains a minimal test suite, to ensure a site with the theme would build successfully. To run the tests, simply run `script/cibuild`. You'll need to run `script/bootstrap` once before the test script will work.