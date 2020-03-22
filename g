#!/usr/bin/env ruby

# React Component Generator
#
# Usage:
#
# Create a component in the src/components dir:
# $ ./g c form-input
#
# Create a page in the src/pages dir:
# $ ./g p contact
#
# Use snake-case.

COMPONENTS_DIR = './src/components'
PAGES_DIR = './src/pages'

component_type = ARGV[0]
component_filename = ARGV[1]

component_base_name = component_filename.split('-')
                        .map { |w| w.capitalize() }
                        .join('')

component_name = if component_type == 'p'
                   "#{component_base_name}Page"
                 else
                   component_base_name
                 end

component_output_filename = "#{component_filename}.component.js";
styles_output_filename = "#{component_filename}.styles.scss";

def write_template(d, fname, content)
  # Write the files.
  File.open("#{d}/#{fname}", 'w') { |f| f.write(content) }
end

# This is the template for a React component.
component_template = %Q[
import React from "react";

import "./#{component_filename}.styles.scss";

const #{component_name} = () => (
    <div className="#{component_filename}">#{component_name}</div>
);

export default #{component_name};
].lstrip()

styles_template = %Q[
.#{component_filename} {

}
].lstrip()

if component_type == 'p'
  dirname = "#{PAGES_DIR}/#{component_filename}"
  unless Dir.exist?(dirname)
    Dir.mkdir(dirname)
    write_template(dirname, component_output_filename, component_template)
    write_template(dirname, styles_output_filename, styles_template)
    puts "created a page at #{dirname}"
  else
    puts "Component already exists at #{dirname}!"
  end
else
  dirname = "#{COMPONENTS_DIR}/#{component_filename}"
  unless Dir.exist?(dirname)
    Dir.mkdir(dirname)
    write_template(dirname, component_output_filename, component_template)
    write_template(dirname, styles_output_filename, styles_template)
    puts "created a component at #{dirname}"
  else
    puts "Component already exists at #{dirname}!"
  end
end
