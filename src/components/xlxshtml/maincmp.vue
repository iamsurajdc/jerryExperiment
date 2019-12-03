<template>
  <div>
    <div class="card mb-4">
      <div class="card-body">
        <!-- <button class="btn btn-primary">
          <input type="file" @change="previewFiles($event)" ref="fileInput" />
        </button> -->
        <button class="btn btn-primary" @click="clickFile()">
          <input
            type="file"
            @change="previewFiles($event)"
            ref="fileInput"
            class="file"
          />
        </button>

        <button
          data-toggle="modal"
          href="#myModal"
          @click="createData"
          class="resetBtn btn btn-primary"
        >
          View
        </button>
        <br />
        <span
          ><i> Please upload the file to generate visualization form</i></span
        >
        <!-- <input type="date" name="bday" >
        <input type="date" name="input1" /> -->
      </div>
    </div>
    <!-- <ul class="nav nav-tabs">
      <li
        class="nav-item"
        v-for="(pageno, pgindex) in sampledata.length"
        :key="pgindex"
        @click="pagenumber = pgindex"
        :class="pagenumber == pgindex ? 'activecls' : ''"
      >
        <a class="nav-link active" data-toggle="tab">Page {{ pgindex + 1 }}</a>
      </li>
    </ul> -->
    <ul class="nav nav-tabs">
      <li
        class="nav-item"
        v-for="(pageno, pgindex) in viewingArray.length"
        :key="pgindex"
        @click="sortBy = viewingArray[pgindex]"
        :class="pagenumber == pgindex ? 'activecls' : ''"
      >
        <a
          class="nav-link"
          :class="sortBy === viewingArray[pgindex] ? 'active' : ''"
          data-toggle="tab"
        >
          {{ viewingArray[pgindex] }}</a
        >
      </li>
    </ul>
    <div class="card tab-content mymainclass" id="myElement">
      <div class="card-body">
        <div v-for="(obj, index) in sortedSampleData" :key="index">
          <div v-if="obj['(All) Format for Upd/Adding'] == 'Page Header'">
            <header
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              class="p-2 mb-3"
            >
              {{ obj["Prompt Text"] }}
            </header>
          </div>
          <div
            class="form-group"
            v-if="obj['(All) Format for Upd/Adding'] == 'Text'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            ><span v-if="obj['IsMandatory']" class="mandatory">*</span>
            <span v-if="obj['Control hint text'] !== ''"
              ><i>({{ obj["Control hint text"] }})</i></span
            >
            <input
              type="text"
              class="form-control"
              id="usr"
              :placeholder="obj['Place holder']"
              :disabled="sortBy && sortBy.match('Viewing')"
            />
          </div>
          <div
            class="form-group"
            v-if="obj['(All) Format for Upd/Adding'] == 'TagsInput'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            ><span v-if="obj['IsMandatory']" class="mandatory">*</span>
            <span v-if="obj['Control hint text'] !== ''"
              ><i>({{ obj["Control hint text"] }})</i></span
            >
            <!-- <input
              type="text"
              class="form-control"
              id="usr"
              data-role="tagsinput"
              :placeholder="obj['Place holder']"
              :disabled="sortBy && sortBy.match('Viewing')"
            /> -->
            <input-tag
              :placeholder="obj['Place holder']"
              :read-only="sortBy && sortBy.match('Viewing')"
            ></input-tag>
          </div>
          <div
            class="form-group"
            v-if="obj['(All) Format for Upd/Adding'] == 'Label'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }} </label
            ><span v-if="obj['Options']"> : {{ obj["Options"] }}</span>
          </div>
          <div
            class="form-group"
            v-if="obj['(All) Format for Upd/Adding'] == 'Text Multiline'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            ><span v-if="obj['IsMandatory']" class="mandatory">*</span>
            <span v-if="obj['Control hint text'] !== ''"
              ><i>({{ obj["Control hint text"] }})</i></span
            >
            <textarea
              type="text"
              class="form-control"
              id="usr"
              :placeholder="obj['Place holder']"
              :disabled="sortBy && sortBy.match('Viewing')"
            ></textarea>
          </div>
          <div
            class="form-group"
            v-if="obj['(All) Format for Upd/Adding'] == 'DropDown'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            ><span v-if="obj['IsMandatory']" class="mandatory">*</span
            ><span v-if="obj['Control hint text'] !== ''"
              ><i>({{ obj["Control hint text"] }})</i></span
            >
            <select
              class="form-control"
              id="sel1"
              :placeholder="obj['Place holder']"
              :disabled="sortBy && sortBy.match('Viewing')"
            >
              <option
                v-for="(item, opindex) in obj.Options.split(',')"
                :key="opindex"
                >{{ item }}</option
              >
            </select>
          </div>
          <div
            class="form-group"
            v-if="obj['(All) Format for Upd/Adding'] == 'DatePicker'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            ><span v-if="obj['IsMandatory']" class="mandatory">*</span>
            <span v-if="obj['Control hint text'] !== ''"
              ><i>({{ obj["Control hint text"] }})</i></span
            >
            <input
              type="date"
              class="form-control"
              id="usr"
              :placeholder="obj['Place holder']"
              :disabled="sortBy && sortBy.match('Viewing')"
            />
            <!-- <input type="text" name="input" placeholder="YYYY-MM-DD" required pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])/(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])/(?:30))|(?:(?:0[13578]|1[02])-31))" title="Enter a date in this format YYYY/MM/DD"/> -->
          </div>
          <div v-if="obj['(All) Format for Upd/Adding'] == 'CheckBox'">
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            >
            <div
              class="form-check"
              v-for="(item, opindex) in obj.Options.split(',')"
              :key="opindex"
            >
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value=""
                  :disabled="sortBy && sortBy.match('Viewing')"
                />{{ item }}
              </label>
            </div>
          </div>
          <div v-if="obj['(All) Format for Upd/Adding'] == 'RadioGroup'">
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            >
            <div
              class="form-check"
              v-for="(item, opindex) in obj.Options.split(',')"
              :key="opindex"
            >
              <label class="form-check-label">
                <input
                  :name="index"
                  type="radio"
                  class="form-check-input"
                  value=""
                  :disabled="sortBy && sortBy.match('Viewing')"
                />{{ item }}
              </label>
            </div>
            <div class="mb-4"></div>
          </div>
          <div
            v-if="obj['(All) Format for Upd/Adding'] == 'RadioGroupDatetime'"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            >
            <div
              class="form-check pb-4"
              v-for="(item, opindex) in obj.Options.split(',')"
              :key="opindex"
            >
              <div style="display:inline-flex">
                <label
                  class="form-check-label"
                  style="width: 500px;margin-top:7px;"
                >
                  <input
                    type="radio"
                    :name="index"
                    class="form-check-input"
                    value=""
                    :disabled="sortBy && sortBy.match('Viewing')"
                  />{{ item }}
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="usr"
                  pattern="mm-dd-yyyy"
                  placeholder="MM-DD-YYYY"
                  :disabled="sortBy && sortBy.match('Viewing')"
                />
              </div>
            </div>
          </div>
          <div v-if="obj['(All) Format for Upd/Adding'] == 'Seperator'">
            <hr class="mb-4" />
          </div>
          <div v-if="obj['(All) Format for Upd/Adding'] == 'Table'">
            <table>
              <tr>
                <th
                  v-for="(item, opindex) in obj.Options.split(',')"
                  :key="opindex"
                >
                  {{ item }}
                </th>
              </tr>
              <tr>
                <td
                  v-for="(item, opindex) in obj.Options.split(',')"
                  :key="opindex"
                >
                  &nbsp;
                </td>
              </tr>
            </table>
          </div>
          <div
            v-if="obj['(All) Format for Upd/Adding'] == 'Slider'"
            class="mb-4"
          >
            <label
              for="usr"
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
              >{{ obj["Prompt Text"] }}{{ obj["Prompt Text (small)"] }}</label
            >
            <div class="slidecontainer">
              <input
                type="range"
                min="1"
                max="100"
                value="50"
                v-model="sliderval"
                class="slider"
                id="myRange"
              />
              <p>
                Value: <span id="demo">{{ sliderval }}</span>
              </p>
            </div>
            <!-- <div class="slideshow-container">
              <div
                class="mySlides"
                v-for="(x, index) in 9"
                :key="index"
                v-show="slideIndex == x"
              >
                <p>Page</p>
                <p class="author">{{ x }}</p>
              </div>
              <a class="prev" @click="plusSlides(slideIndex - 1)">❮</a>
              <a class="next" @click="plusSlides(slideIndex + 1)">❯</a>
            </div>

            <div class="dot-container">
              <span class="dot" @click="currentSlide(x)"></span>
            </div> -->
          </div>
          <div v-if="obj['(All) Format for Upd/Adding'] == 'Button'">
            <button
              :style="{
                background: obj['Background'],
                color: obj['text color'],
                fontSize: obj['fontSize'] + 'px',
                fontWeight: obj['IsBold'] == 'Yes' ? 'bold' : ''
              }"
            >
              {{ obj["Prompt Text"] }}
            </button>
          </div>
        </div>
        <div v-if="sampledata.length === 0">Data not available</div>
      </div>
    </div>

    <div id="myModal" class="modal fade in">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <a class="btn btn-default" data-dismiss="modal"
              ><span class="glyphicon glyphicon-remove"></span
            ></a>
            <h4 class="modal-title">Component Data</h4>
          </div>
          <div class="modal-body">
            <div class="float-left">
              {{ mytemplate1 }}
              <pre>
                          {{ templateData }}
                          </pre
              >
              {{ mytemplate2 }}
              <br />
              {{ mystyle1 }}
              <pre>
                  {{ templateStyle }}
              </pre>
              {{ mystyle2 }}
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-group">
              <button class="btn btn-danger" data-dismiss="modal">
                <span class="glyphicon glyphicon-remove"></span> Cancel
              </button>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dalog -->
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import InputTag from "vue-input-tag";
var beautifyHtml = require("js-beautify").html;
// var beautifyCss = require('js-beautify').css
// var CSSSteal = require('css-steal')
export default {
  data() {
    return {
      sampledata: [],
      sampledata1: [],
      pagenumber: 0,
      viewingArray: [
        "(Staff) Sequence for Viewing",
        "(Resident) Sequence for Viewing",
        " (All)   Format for Viewing [2]",
        "(Staff) Sequence for Update/Adding",
        "(Resident) Sequence for Update/Adding"
      ],
      sortBy: null,
      slideIndex: 1,
      sliderval: 0,
      templateData: null,
      mytemplate1: "<template>",
      mytemplate2: "</template>",
      templateStyle: null,
      mystyle1: "<style>",
      mystyle2: "</style>"
    };
  },
  components: {
    InputTag
  },
  computed: {
    sortedSampleData() {
      if (this.sortBy === "clear") {
        return [];
      } else if (this.sortBy !== null) {
        console.log("gsdfgd");
        return this.sortfun();
      } else {
        return this.sampledata1[0];
      }
    }
  },
  created() {
    // this.showSlides(this.slideIndex);
  },
  watch: {
    $refs: {
      handler: function() {
        console.log("hit");
      },
      deep: true
    }
  },
  methods: {
    previewFiles(e) {
      this.sampledata = [];
      this.sampledata1 = [];
      console.log(this.$refs.fileInput);
      let vm = this;
      var files = e.target.files,
        f = files[0];
      console.log(f);
      var reader = new FileReader();
      reader.onload = function(e) {
        var options = {
          defval: ""
        };
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        for (let sheetno = 0; sheetno < workbook.SheetNames.length; sheetno++) {
          let sheetName = workbook.SheetNames[sheetno];
          /* DO SOMETHING WITH workbook HERE */
          console.log(workbook);
          let worksheet = workbook.Sheets[sheetName];
          console.log(XLSX.utils.sheet_to_json(worksheet, options));
          vm.sampledata.push(XLSX.utils.sheet_to_json(worksheet, options));
          vm.sampledata1.push(XLSX.utils.sheet_to_json(worksheet, options));
        }
      };
      reader.readAsArrayBuffer(f);
      this.sortBy = this.viewingArray[0];
      console.log(this.sampledata);
      console.log(this.sampledata1);
    },
    clickFile() {
      const file = document.querySelector(".file");
      file.value = "";
      console.log(this.$refs.fileInput);
    },
    sortfun() {
      console.log("in sort fun");
      if (this.sampledata1.length) {
        this.sampledata1[0] = this.sampledata[0].filter(
          e => e[this.sortBy] !== ""
        );
        console.log("this.sampledata", this.sampledata);
        return this.sampledata1[0].sort((a, b) =>
          a[this.sortBy] > b[this.sortBy]
            ? 1
            : b[this.sortBy] > a[this.sortBy]
            ? -1
            : 0
        );
      } else return [];
    },
    reset() {
      // location.reload();
      //this.sortBy = "clear";
      //const input = this.$refs.fileInput.change();
      /*  input.type = "text";
      input.type = "file"; */
    },
    currentSlide(n) {
      this.slideIndex = n + 1;
    },
    plusSlides(n) {
      this.slideIndex = n;
    },
    createData() {
      this.getTemplateCssData();
      this.getTemplateData();
    },
    getTemplateCssData() {
      // console.log(document.getElementsByTagName("STYLE")[1].innerHTML);
      this.templateStyle = document.getElementsByTagName("STYLE")[1].innerHTML;
      // console.log(this.templateStyle);
      /* let crossrule;
      if (document.styleSheets[0].cssRules)
      crossrule=document.styleSheets[0].cssRules[0]
      else if (document.styleSheets[0].rules)
      crossrule=document.styleSheets[0].rules[0]
      console.log(crossrule);
      var css = CSSSteal(document.querySelector('.mymainclass'))
      this.templateStyle = beautifyCss(css.toCSSText()); */
      /* console.log("button click");
      console.log("css code", document.getElementById("abc"));
      var xyz = document.getElementById("abc");

      document.getElementById("demo").innerHTML = xyz; */
      // var cssArray = css.toJS();
    },
    getTemplateData() {
      // var target = document.getElementById("myElement");
      // target = new XMLSerializer().serializeToString(target).replace(/<\\ !--.+?-->/sg,"");
      this.templateData = new XMLSerializer()
        .serializeToString(document.getElementById("myElement"))
        .replace(/<!--.+?-->/gs, "");
      /* var wrap = document.createElement("div");
      wrap.appendChild(target.cloneNode(true)); */
      this.templateData = beautifyHtml(this.templateData.trim()); 
      // console.log(this.templateData);
    }
  }
};
</script>
<style>
.mandatory {
  color: red;
}
table,
th,
td {
  border: 1px solid black;
  min-width: 20%;
  border-collapse: collapse;
}
.nav-item {
  cursor: pointer;
}

.nav-tabs .nav-item {
  margin-bottom: -1px;
  width: 20%;
}

.nav-tabs .nav-link {
  background: #f8f9fa;
}
.nav-tabs .nav-link.active {
  background: #ccc;
}
.resetBtn {
  float: right;
}

/* {
  box-sizing: border-box;
} */
body {
  font-family: Verdana, sans-serif;
  margin: 0;
}

/* Slideshow container */
.slideshow-container {
  position: relative;
  background: #f1f1f1f1;
}

/* Slides */
.mySlides {
  padding: 20px;
  text-align: center;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -30px;
  padding: 16px;
  color: #888;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  position: absolute;
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

/* The dot/bullet/indicator container */
.dot-container {
  text-align: center;
  padding: 20px;
  background: #ddd;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

/* Add a background color to the active dot/circle */
.active,
.dot:hover {
  background-color: #717171;
}

/* Add an italic font style to all quotes */
q {
  font-style: italic;
}

/* Add a blue color to the author */
.author {
  color: cornflowerblue;
}

.vue-input-tag-wrapper.read-only {
  cursor: default;
  height: 39px;
  background: #e9ecef;
  border: none;
}

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
i {
  color: #ccc;
  font-size: 14px;
}
.myclass {
  display: flex;
}

pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

.modal-body{
    height: 580px;
    overflow: auto;
}

.mdal-header{
  justify-content: center ! important;
}

.modal-content{
  width:125%;
}
</style>
