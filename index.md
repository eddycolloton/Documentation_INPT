---
layout: default
---

INPT is a bash scripting project created for TBMA processing at HMSG. 

INPT takes media files as input, typically from an external hard drive, and outputs metadata files according to the HMSG directory structure and naming conventions.

# Introduction

### HMSG Workflow

HMSG stores technical metadata on TBMA in 3 different locations, for 3 different purposes:

1. Metadata sidecar files in the staging directory. These are temporary. They're at hand when viewing the artwork media. But the media will ultimately be ingest into the SI DAMS, and the staging directory discarded. 
2. Metadata sidecar files in the artwork file. These are for long term storage. 
3. The appendix to the conservation report. The contents of the sidecar metadata files (with a few exceptions) are written to a text file named appendix.txt, stored in the 'Condition_Tmt Reports' directory of the artwork file. Once assessment of the media is complete, the appendix.txt file will be attached to the conservation report in TMS.

The bash scripts in INPT write data to all 3 of these locations.

## INPUTS

In order to name and organize artwork metadata according to HMSG's conventions, the following information must be collected.

*   Artist's First Name
*   Artist's Last Name
*   Artwork Title
*   Accession Number
*   Path to Artwork File on T: Drive
*   Staging Directory on DroBo
*   Path to hard drive
*   Path to Technical Info_Specs directory
*   Path to Technical Info_Specs/Sidecars directory
*   Path to Condition_Tmt Reports directory
*   Path Artwork Files parent directory
*   Path to the Time-based Media Artworks directory on the TBMA DroBo

Any of this data can be provided before running the script via the input.csv. The CSV can contain as much or as little data as desired.

| metadata field      | value        |
|:--------------------|:-------------|
| Artist's First Name | Diana        |
| Artist's Last Name  | Thater       |
| Artwork Title       | Oo Fifi...   |
| Accession Number    | 03.9         |

The input csv is run as an "argument" to start_input.sh like this:
```
./start_input.sh input.csv
```

A template of the CSV is provided: `INPT/csv_templates/input_template.csv`

Information not in the input.csv where possible, is inferred from the other inputs. For example, if the artist's last name is known, the artwork files are searched for a match.
If a metadata field cannot be inferred, the user will be prompted to input the information manually.

## OUTPUTS

Once the input information has been collected there are a variety of options for output. 

*   Move all files to staging directory
*   Select files to move to staging directory
*   Run all tools
*   Run tree on volume
*   Run siegfried on files in staging directory
*   Run MediaInfo on video files in staging directory
*   Run Exiftool on media files in staging directory
*   Create framdemd5 output for video files in staging directory
*   Create QCTools reports for video files in staging directory

Just as with inputs, any of these options can be selected before running the script via the output.csv.
A "1" in the 2nd column indicates the option has been selected, a "0" indicates the option is declined. 

| output option                             | selection    |
|:------------------------------------------|:-------------|
| Move all files to staging directory       | 1            |
| Select files to move to staging directory | 0            |
| Run all tools                             | 1            |
| Run tree on volume                        | 0            |

The output csv is run as an "argument" to start_output.sh like this:
```
./start_output.sh output.csv
```

A template of the CSV is provided: `INPT/csv_templates/output_template.csv`

When start_input.sh completes, it outputs an input.csv that documents the information gathered during the input process. This filled out input.csv file can be provided to start_output.sh to resume processing an artwork, or run additional output options.
Similarly, both an input.csv and an output.csv can be provided to start_input.sh to run an "end-to-end" process without any manual intervention. 

# Usage

screen recordings of using INPT

## Start Input  

./start_input [options] [optional input.csv] [optional output.csv]

Options:
--typos, -t
                  Confirm manually input text

#### input.csv

All of the information necessary to run INPT can be provided via a CSV. An example of the input csv is in `INPT/csv_templates/`
The input.csv contains 2 columns: metadata fields, and metadata values. start_input.sh can be run with none of the metadata values, or all of them.
Metadata values added to the 2nd column should be enclosed in "double quotes", especially if they contain spaces or commas. 
Directory paths can be in either escaped paths (like this: Lastname\,\ Firstname/time-based\ media/2024.004_Sometitle) or regular file paths (like this: Lastname, Firstname/time-based media/2024.004_Sometitle)
It is recommended to run start_input with an input.csv that contains at least the values that rarely change, such as "Path Artwork Files parent directory" or "Path to the Time-based Media Artworks directory on the TBMA DroBo."
When start_input.sh completes, it outputs an input.csv that documents the information gathered during the input process. Some of the metadata fields are intended only for this purpose. 

Here are the metadata fields listed in column 1 of input.csv:
- Artist's First Name
  - First name of the artist as it appears in the Artwork File (or will appear in new Artwork File)
- Artist's Last Name
  - Last name of the artist as it appears in the Artwork File (or will appear in new Artwork File)
- Artwork Title
  - Titles containing spaces or special characters (,.*!) should be in double quotes ""
- Accession Number
  - Accession number of artwork. For artwork's without an existing Artwork File, use YYYY.### format, for works with an existing Artwork File, use existing accession format (such as YY.##).
- Path to Artwork File on T: Drive
  - The path to the artwork file often can be inferred from artist's name or the accession number, but can be read from the input.csv as well. 
- Staging Directory on DroBo
  - The path to the Staging Directory also often can be inferred from artist's name or the accession number, or can be read from the input.csv.
- Path to hard drive
  - The path to the volume or directory that stores the media to be processed (typically an external hard drive)
- Path to Technical Info_Specs directory
  - This field is intended to be filled out at the completion of the start_input.sh process
- Path to Technical Info_Specs/Sidecars directory
  - This field is intended to be filled out at the completion of the start_input.sh process
- Path to Condition_Tmt Reports directory
  - This field is intended to be filled out at the completion of the start_input.sh process
- Path Artwork Files parent directory
  - The path to the directory that stores all of the artwork files on the T: Drive, currently: "/Volumes/Shared/departments/CONSERVATION/ARTWORK FILES". 
  - It is recommended that this metadata value stay "fixed" in the template and used in most cases. 
- Path to the Time-based Media Artworks directory on the TBMA DroBo
  - The path to the "Time-based Media Artworks" directory on the DroBo that stores all of the TBM media staged prior to ingest into SI DAMS.
  - It is recommended that this metadata value stay "fixed" in the template and used in most cases. 

## Header 2

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.

### Header 3

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

#### Header 4

*   This is an unordered list following a header.
*   This is an unordered list following a header.
*   This is an unordered list following a header.

##### Header 5

1.  This is an ordered list following a header.
2.  This is an ordered list following a header.
3.  This is an ordered list following a header.

###### Header 6

| head1        | head two          | three |
|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

### There's a horizontal rule below this.

* * *

### Here is an unordered list:

*   Item foo
*   Item bar
*   Item baz
*   Item zip

### And an ordered list:

1.  Item one
1.  Item two
1.  Item three
1.  Item four

### And a nested list:

- level 1 item
  - level 2 item
  - level 2 item
    - level 3 item
    - level 3 item
- level 1 item
  - level 2 item
  - level 2 item
  - level 2 item
- level 1 item
  - level 2 item
  - level 2 item
- level 1 item

### Small image

![Octocat](https://github.githubassets.com/images/icons/emoji/octocat.png)

### Large image

![Branching](https://guides.github.com/activities/hello-world/branching.png)


### Definition lists can be used with HTML syntax.

<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```
