---
layout: default
---

INPT is a bash scripting project created for TBMA processing at HMSG. 

INPT takes media files as input, typically from an external hard drive, and outputs metadata files according to the HMSG directory structure and naming conventions.
* * *
[Introduciton](#introduction)

[HMSG Workflow](#hmsg-workflow)

[INPUTS](#inputs)

[OUTPUTS](#outputs)

[Usage: Start Input](#usage-start-input)

[input.csv](#inputcsv)

[Options](#options)

[Prompts](#prompts)
* * *
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

Any of this data can be provided before running start_input.sh via the input.csv. The CSV can contain as much or as little data as desired.

| metadata field      | value        |
|:--------------------|:-------------|
| Artist's First Name | Diana        |
| Artist's Last Name  | Thater       |
| Artwork Title       | Oo Fifi...   |
| Accession Number    | 03.9         |

The input csv is run as an "argument" to start_input.sh like this:   
`./start_input.sh input.csv`

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
`./start_output.sh output.csv`

A template of the CSV is provided: `INPT/csv_templates/output_template.csv`

When start_input.sh completes, it outputs an input.csv that documents the information gathered during the input process. This filled out input.csv file can be provided to start_output.sh to resume processing an artwork, or run additional output options.
Similarly, both an input.csv and an output.csv can be provided to start_input.sh to run an "end-to-end" process without any manual intervention. 

# Usage: Start Input  

screen recordings of using INPT

```
./start_input [options] [optional input.csv] [optional output.csv]

Options:
--help, -h
	Display this text.
--stop, -s
	Stop process after start_input.sh, do not proceed to start_output.sh
--typo, -t
	Confirm manually input text
```
### input.csv

All of the information necessary to run INPT can be provided via a CSV. An example of the input.csv is in `INPT/csv_templates/`  
The input.csv contains 2 columns: metadata fields, and metadata values. start_input.sh can be run with none of the metadata values, or all of them.  
Metadata values added to the 2nd column should be enclosed in "double quotes", especially if they contain spaces or commas.   
Directory paths can be in either escaped paths (like this: Lastname\,\ Firstname/time-based\ media/2024.004_Sometitle) or regular file paths (like this: Lastname, Firstname/time-based media/2024.004_Sometitle)  
The "Path Artwork Files parent directory" and "Path to the Time-based Media Artworks directory on the TBMA DroBo" have default values for use at the HMSG media lab. Default values are assumed unless they are missing, or supersede by the input.csv.  
When start_input.sh completes, it outputs an input.csv that documents the information gathered during the input process. Some of the metadata fields are intended only for this purpose. 

Here are the metadata fields listed in column 1 of input.csv:
<dl>
<dt>Artist's First Name</dt>
<dd>First name of the artist as it appears in the Artwork File (or will appear in new Artwork File)</dd>
<dt>Artist's Last Name</dt>
<dd>Last name of the artist as it appears in the Artwork File (or will appear in new Artwork File)</dd>
<dt>Artwork Title</dt>
<dd>Titles containing spaces or special characters (,.*!) should be in double quotes ""</dd>
<dt>Accession Number</dt>
<dd>Accession number of artwork. For artwork's without an existing Artwork File, use YYYY.### format, for works with an existing Artwork File, use existing accession format (such as YY.##).</dd>
<dt>Path to Artwork File on T: Drive</dt>
<dd>The path to the artwork file often can be inferred from artist's name or the accession number, but can be read from the input.csv as well.</dd>
<dt>Staging Directory on DroBo</dt>
<dd>The path to the Staging Directory also often can be inferred from artist's name or the accession number, or can be read from the input.csv.</dd>
<dt>Path to hard drive</dt>
<dd>The path to the volume or directory that stores the media to be processed (typically an external hard drive)</dd>
<dt>Path to Technical Info_Specs directory</dt>
<dd>This field is intended to be filled out at the completion of the start_input.sh process</dd>
<dt>Path to Technical Info_Specs/Sidecars directory</dt>
<dd>This field is intended to be filled out at the completion of the start_input.sh process</dd>
<dt>Path to Condition_Tmt Reports directory</dt>
<dd>This field is intended to be filled out at the completion of the start_input.sh process</dd>
<dt>Path Artwork Files parent directory</dt>
<dd>The path to the directory that stores all of the artwork files on the T: Drive, currently: "/Volumes/Shared/departments/CONSERVATION/ARTWORK FILES".</dd>
<dd>It is recommended that this metadata value stay "fixed" in the template</dd>
<dt>Path to the Time-based Media Artworks directory on the TBMA DroBo</dt>
<dd>The path to the "Time-based Media Artworks" directory on the DroBo that stores all of the TBM media staged prior to ingest into SI DAMS.</dd>
<dd>It is recommended that this metadata value stay "fixed" in the template.</dd>
</dl>

### Options

start_input has multiple options that are used to pass parameters to a program. 
Each option (sometimes called 'switches' or 'flags') can either be called with a single dash ('-') and one letter, or two dashes and a word.

`-t, --typo`  
With the typo check on, after every prompt for manual input, a second prompt will give the option to "go back a step" if the input was incorrect.  

```
2024-02-20 - 15.50.17 - The title manually input: Untitled
 ________________________________________ 
/ Just checking for typos - Is the title \
\ entered correctly?                     /
 ---------------------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
1) yes
2) no, go back a step
```

`-s, --stop`  
The'--stop' option prevents start_output.sh from starting automatically after start_input.sh. 
The output of this process will be an input.csv with every metadata field filled out, stored in the artwork file.
Use the stop option if you are not ready to decide which files will be moved to the staging directory and/or which tools will be run on those files. 
You can resume the process by running start_output.sh with the completed input.csv like this:
```
./start_output.sh input.csv
``` 

`-h, --help`
Display basic script usage:
```
INPT is a bash scripting project created for TBMA processing at HMSG.

./start_input [options] [optional input.csv] [optional output.csv]

Options:
--help, -h
	Display this text.
--stop, -s
	Stop process after start_input.sh, do not proceed to start_output.sh
--typos, -t
	Confirm manually input text
```

### Prompts

Any information not provided in the input.csv, that cannot be inferred from contextual information, will be manually typed in to terminal. 
The script will prompt the user for these necessary inputs. 
If you plan to manually enter information it is recommended that you run the script with the -t or --typos option, like this:
```
./start_input --typos 
```
##### Artist's Name
When start_.input.sh is run without any input.csv you will first be prompted:
- Input artist's first name
- Input artist's last name
  - start_input.sh will search the artwork files for a directory that has the artist's name

Once the artist's name has been manually input, if the artwork file exists, the path to the artwork file, as well as the accession number of the artwork, will be inferred by start_input.sh.  
When inputs are found by start_input.sh they are printed to the terminal in magenta. 

##### Path to the artwork file
If the artwork file is not found or does not exists, you will be prompted:
- Enter a number to set the path to the Artwork File on the T:\ drive
  - Input path
    - If the artwork file does exists, but was not found, choose this option
  - Create Artwork File
    - If the artwork file does not exist, choose this option
    - In order to create the artwork file, you will be prompted to manually input both tha accession number and title of the artwork 

##### Path to the staging directory
Like with the artwork files, if the staging directory on the TBMA DroBo already exists, start_input.sh will infer those inputs.
Otherwise, you will prompted to either input the path or create the staging directory, just as with the artwork folder. 
- Enter a number to set the path to the staging directory on the TBMA DroBo
  - Input path
    -  If the staging directory does exists, but was not found, choose this option
  - Create Staging Directory
    - If the staging directory does not exist, choose this option
    - If the accession number and artist's name are known (likely by this prompt), no further information will be manually input

##### Path to the volume
Finally you will be prompted to input the path to the "Volume" or the hard drive that contains files to be processed.
Mounted volumes are searched for the artist's last name and, if known, the title. Any matches are presented as options for selection, otherwise the prompt must be entered manually. 

##### Path to the output directories
With this information the path to the directories in the artwork files where outputs (the "Technical Info_Specs" directory or the "Condition_Tmt Reports" directory) will be written can likely be inferred. 
If the artwork file does not match the expected structure you will be prompted to input the parent directory (the directory directly above) where you want either the "Technical Info_Specs" directory or the "Condition_Tmt Reports" directory of the artwork file.
- Select a directory to create the Condition_Tmt Reports (or Technical Info_Specs) directory, or choose to quit
  - /path/to/artwork file/
    - Create either the Condition_Tmt Reports or the Technical Info_Specs directory directly below the artwork file
  - Enter path to parent directory
    - Manually input the path to the parent directory of either the Condition_Tmt Reports or the Technical Info_Specs directory. Output directory will be made inside that directory. 
  - Quit

##### Declared variables

When start_input.sh completes, it will have collected (or created) the aforementioned inputs listed in the INPUTS section of the introduction. These inputs are saved to an input.csv with each row filled out. This input.csv can be used to resume the start_output.sh process later. In the event of an error, the input.csv can simply be edited and then provided to start_output.sh to avoid re-running start_input.sh. 

The variables are also recorded to the log file. The log file can be used as a troubleshooting tool if you encounter unexpected behavior or results.

##### Known Paths

start_input.sh assumes that the script is being run in the HMSG media lab. The default directory paths to certain "locations" are assumed, and you will only be prompted to enter the paths if they are not found at the expected path.

The 2 assumed known paths are:
* The artwork files parent directory on the shared T:\ drive
* The "Time-based Media Artworks" directory on the TBMA DroBo

If either the artwork files directory or time-based media artworks directory are not in the expected location, or not connected to the computer, you will be prompted for the path, like this:
```
 ______________________________ 
/ Please input the path to the \
| ARTWORK FILES directory from |
| the T:\ drive. Feel free to  |
| drag and drop the directory  |
\ into terminal:               /
 ------------------------------ 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
Follow this prompt to provide the path to the directory.
At the time of writing the path to the artwork file was: `/Volumes/hmsg/DEPARTMENTS/CONSERVATION/ARTWORK FILES/`
At the time of writing the path to the time-based media artworks directory on the DroBo was: `/Volumes/TBMA DroBo/Time-based Media Artworks/`

### Logs

As soon as `./start_input.sh` is run a log is created in the `/INPT/logs` directory using the following naming convention:
`YYYY-MM-DD-HH.MM.SS_INPT.log`

The log contains all information collected by start_input.sh and all actions run by start_output.sh. Once start_output.sh is complete, the log is copied to the Technical Info_Specs directory in the artwork file and renamed:
`Artist Last Name_Accession Number_YYYY-MM-DD-HH.MM.SS_INPT.log`

The log documents the actions of start_input.sh and start_output.sh. It is the best place to look when troubleshooting unexpected behavior or results.

Below is a sample log:
```
====== Script started at 2024-02-19 - 14.53.09 ======
2024-02-19 - 14.53.10 - Reading CSV file: input_template.csv
2024-02-19 - 14.53.10 - Input CSV file detected: /Users/eddycolloton/git/INPT/csv_templates/input_template.csv
2024-02-19 - 14.53.10 - Reading variables from input csv: /Users/eddycolloton/git/INPT/csv_templates/input_template.csv
2024-02-19 - 14.53.10 - Successfully read variables from /Users/eddycolloton/git/INPT/csv_templates/input_template.csv
2024-02-19 - 14.53.19 - Artist name manually input: Tess McTest
2024-02-19 - 14.53.19 - No path to the artwork file found in input csv
2024-02-19 - 14.53.19 - The artwork file is /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess
2024-02-19 - 14.53.19 - The accession number is 1999.066 found in the artwork folder /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled
2024-02-19 - 14.53.20 - No path to Staging Directory found in input csv
2024-02-19 - 14.53.30 - Path to the staging directory: /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest
2024-02-19 - 14.53.31 - The path to the volume from CSV: /Volumes/Artwork
2024-02-19 - 14.53.31 - No path to the Technical Info and Specs directory found in input csv
2024-02-19 - 14.53.31 - Path to the Technical Info_Specs directory: /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs
2024-02-19 - 14.53.31 - Metadata output will be written to the appendix.txt file in /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs
2024-02-19 - 14.53.31 - No path to the Condition_Tmt Reports directory found in input csv
2024-02-19 - 14.53.31 - Path to the Condition_Tmt Reports directory: /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports
2024-02-19 - 14.53.31 - Metadata output will be written to the appendix.txt file in /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports
2024-02-19 - 14.53.31 - start_input.sh complete:
----------------------->The artist name is Tess McTest
----------------------->The title of the work is 
----------------------->The accession number is 1999.066
----------------------->The artwork folder is /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess
----------------------->The staging directory is /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest
----------------------->The volume path is /Volumes/Artwork
2024-02-19 - 14.53.31 - Declared variables have been written to /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs/McTest_1999.066_2024-02-19-14.53.31.csv
2024-02-19 - 14.53.31 - Comparing McTest_1999.066_2024-02-19-14.53.31.csv with McTest_1999.066_2024-02-19-14.13.13.csv
2024-02-19 - 14.53.31 - Differences in McTest_1999.066_2024-02-19-14.13.13.csv CSV found
2024-02-19 - 14.54.27 - Moving old CSV file: /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs/McTest_1999.066_2024-02-19-14.13.13.csv
2024-02-19 - 14.54.27 - Created old_CSVs directory and moved pre-existing CSV file
2024-02-19 - 14.54.27 - start_input.sh complete! Beginning start_output.sh
2024-02-19 - 14.54.42 - The selected files are: /Volumes/Artwork/instructions.pdf

2024-02-19 - 14.54.54 ******** generating md5 checksums on selected files ******** 
md5deep will be run on /Volumes/Artwork
2024-02-19 - 14.54.54 ******** md5 checksum manifest from /Volumes/Artwork completed ******** 

		md5deep Results:
		copied to /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest and 
		/Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports/1999.066_appendix.txt
		===================> Total Execution Time: 0 m 0 s

2024-02-19 - 14.54.54 ******** copying files started ******** 
	copying individual files from the volume

	list of files copied below:
	/Volumes/Artwork/instructions.pdf

2024-02-19 - 14.54.54 ******** file copying and md5 checksum manifest from /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest completed ******** 

		rsync Results:
		manifest copied to /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest and 
		/Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports/1999.066_appendix.txt 
 rsync logs in /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs
		===================> Total Execution Time: 0 m 0 s
2024-02-19 - 14.54.54 ******** checksum manifests match ******** 

		===================> Total Execution Time: 0 m 0 s
2024-02-19 - 14.54.54 - sf started! siegfried will be run on /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest
2024-02-19 - 14.54.54 - sf run on instructions.pdf
2024-02-19 - 14.54.54 - sf run on instructions.pdf
2024-02-19 - 14.54.54 - sf run on smpte_bars_prores_ch1.mov
2024-02-19 - 14.54.54 - sf run on smpte_bars_prores_ch3.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch2.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch2.mov.qctools.mkv
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch1.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch2.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch1.mov.qctools.mkv
2024-02-19 - 14.54.55 - ===================> siegfried complete! Total Execution Time: 0 m 1 s
2024-02-19 - 14.54.55 - siegfried output written to 1999.066_appendix.txt and saved as a sidecar file
2024-02-19 - 14.54.55 - Created old_logs directory and moved pre-existing .log files
```

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
