(function(){var t,l;l="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",l.XmlUtil=l.XmlUtil=function(){function t(){}return t.prototype.getListXmlElements=function(t,l,e){var n,o,s,f,g,r,u,i,a,h;for(null==l&&(l=0),null==e&&(e=t.length-1),i=DocUtils.preg_match_all("<(/?[^/> ]+)([^>]*)>",t.substr(l,e)),r=[],n=a=0,h=i.length;h>a;n=++a)u=i[n],"/"===u[1][0]?(f=!1,r.length>0&&(g=r[r.length-1],s=g.tag.substr(1,g.tag.length-2),o=u[1].substr(1),s===o&&(f=!0)),f?r.pop():r.push({tag:"<"+u[1]+">",offset:u.offset})):"/"===u[2][u[2].length-1]||r.push({tag:"<"+u[1]+">",offset:u.offset});return r},t.prototype.getListDifferenceXmlElements=function(t,l,e){var n;for(null==l&&(l=0),null==e&&(e=t.length-1),n=this.getListXmlElements(t,l,e);;){if(n.length<=1)break;if(n[0].tag.substr(2)!==n[n.length-1].tag.substr(1))break;n.pop(),n.shift()}return n},t}()}).call(this);
(function(){var t,i,e;e="undefined"!=typeof global&&null!==global?global:window,i="undefined"!=typeof global&&null!==global?"node":"browser",e.TemplaterState=t=function(){function t(){}return t.prototype.calcStartTag=function(t){return this.calcPosition(t.start)},t.prototype.calcEndTag=function(t){return this.calcPosition(t.end)+1},t.prototype.calcPosition=function(t){return this.matches[t.numXmlTag].offset+this.matches[t.numXmlTag][1].length+this.charactersAdded[t.numXmlTag]+t.numCharacter},t.prototype.initialize=function(){return this.inForLoop=!1,this.inTag=!1,this.inDashLoop=!1,this.rawXmlTag=!1,this.textInsideTag=""},t.prototype.startTag=function(){if(this.inTag===!0)throw"Tag already open with text: "+this.textInsideTag;return this.inTag=!0,this.rawXmlTag=!1,this.textInsideTag="",this.tagStart=this.currentStep},t.prototype.loopType=function(){return this.inDashLoop?"dash":this.inForLoop?"for":this.rawXmlTag?"xml":"simple"},t.prototype.isLoopClosingTag=function(){return"/"===this.textInsideTag[0]&&"/"+this.loopOpen.tag===this.textInsideTag},t.prototype.endTag=function(){var t;if(this.inTag===!1)throw"Tag already closed";return this.inTag=!1,this.tagEnd=this.currentStep,"@"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.rawXmlTag=!0,this.tag=this.textInsideTag.substr(1)),"#"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inForLoop=!0,this.loopOpen={start:this.tagStart,end:this.tagEnd,tag:this.textInsideTag.substr(1)}),"-"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inDashLoop=!0,t=/^-([a-zA-Z_:]+) ([a-zA-Z_:]+)$/,this.loopOpen={start:this.tagStart,end:this.tagEnd,tag:this.textInsideTag.replace(t,"$2"),element:this.textInsideTag.replace(t,"$1")}),"/"===this.textInsideTag[0]?this.loopClose={start:this.tagStart,end:this.tagEnd}:void 0},t}()}).call(this);
(function(){var e,n,t=[].slice;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",n.DocUtils={},n.docX=[],n.docXData=[],DocUtils.defaultParser=function(e){return{get:function(n){return n[e]}}},DocUtils.nl2br=function(e){return(e+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2")},DocUtils.loadDoc=function(t,r){var o,l,i,c,a,u,s,f,d,p,g,h,m,D,b,y,w;if(null==r&&(r={}),h=null!=r.docx?!r.docx:!1,l=null!=r.async?r.async:!1,p=null!=r.intelligentTagging?r.intelligentTagging:!1,c=null!=r.callback?r.callback:null,i="",null==t)throw"path not defined";if(-1!==t.indexOf("/")?(b=t,f=b):(f=t,""===i&&null!=DocUtils.pathConfig&&(i="browser"===e?DocUtils.pathConfig.browser:DocUtils.pathConfig.node),b=i+t),g=function(e){return n.docXData[f]=e,h===!1?(n.docX[f]=new DocxGen(e,{},{intelligentTagging:p}),n.docX[f]):(null!=c&&c(n.docXData[f]),l===!1?n.docXData[f]:void 0)},"browser"===e)w=new XMLHttpRequest,w.open("GET",b,l),w.overrideMimeType&&w.overrideMimeType("text/plain; charset=x-user-defined"),w.onreadystatechange=function(){if(4===this.readyState){if(200===this.status)return g(this.response);if(null!=c)return c(!0)}},w.send();else if(d=new RegExp("(https?)","i"),d.test(t)){switch(y=url.parse(t),r={hostname:y.hostname,path:y.path,method:"GET",rejectUnauthorized:!1},s=function(){throw"Error on HTTPS Call"},D=function(e){var n;return e.setEncoding("binary"),n="",e.on("data",function(e){return n+=e}),e.on("end",function(){return g(n)})},y.protocol){case"https:":m=https.request(r,D).on("error",s);break;case"http:":m=http.request(r,D).on("error",s)}m.end()}else if(l===!0)fs.readFile(b,"binary",function(e,n){if(e){if(null!=c)return c(!0)}else if(g(n),null!=c)return c(n)});else try{if(a=fs.readFileSync(b,"binary"),o=g(a),null==c)return o;c(a)}catch(U){u=U,null!=c&&c()}return f},DocUtils.clone=function(e){var n,t,r;if(null==e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(e instanceof RegExp)return n="",null!=e.global&&(n+="g"),null!=e.ignoreCase&&(n+="i"),null!=e.multiline&&(n+="m"),null!=e.sticky&&(n+="y"),new RegExp(e.source,n);r=new e.constructor;for(t in e)r[t]=DocUtils.clone(e[t]);return r},DocUtils.xml2Str=function(e){var n,t,r;if(void 0===e)throw"xmlNode undefined!";try{"undefined"!=typeof global&&null!==global?(n=new XMLSerializer,t=n.serializeToString(e)):t=(new XMLSerializer).serializeToString(e)}catch(o){r=o,t=e.xml}return t=t.replace(/\x20xmlns=""/g,"")},DocUtils.Str2xml=function(e){var t,r;return n.DOMParser?(t=new DOMParser,r=t.parseFromString(e,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async=!1,r.loadXML(e)),r},DocUtils.replaceFirstFrom=function(e,n,t,r){return e.substr(0,r)+e.substr(r).replace(n,t)},DocUtils.encode_utf8=function(e){return unescape(encodeURIComponent(e))},DocUtils.convert_spaces=function(e){return e.replace(new RegExp(String.fromCharCode(160),"g")," ")},DocUtils.decode_utf8=function(e){var n;try{return void 0===e?void 0:decodeURIComponent(escape(DocUtils.convert_spaces(e)))}catch(t){throw n=t,console.log(e),console.log("could not decode"),"end"}},DocUtils.base64encode=function(e){return btoa(unescape(encodeURIComponent(e)))},DocUtils.preg_match_all=function(e,n){var r,o;return"object"!=typeof e&&(e=new RegExp(e,"g")),r=[],o=function(){var e,n,o,l,i;return e=arguments[0],o=4<=arguments.length?t.call(arguments,1,i=arguments.length-2):(i=1,[]),n=arguments[i++],l=arguments[i++],o.unshift(e),o.offset=n,r.push(o)},n.replace(e,o),r},DocUtils.sizeOfObject=function(e){var n,t,r;r=0,t=0;for(n in e)r++;return r},Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.min=function(){return Math.min.apply(null,this)}}).call(this);
(function(){var t,e,i,s=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};i="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t){this.zip=t}var e;return e=["gif","jpeg","jpg","emf","png"],t.prototype.getImageList=function(){var t,i,n,l;l=/[^.]+\.([^.]+)/,i=[];for(n in this.zip.files)t=n.replace(l,"$1"),s.call(e,t)>=0&&i.push({path:n,files:this.zip.files[n]});return i},t.prototype.setImage=function(t,e,i){return null==i&&(i={}),this.zip.remove(t),this.zip.file(t,e,i)},t.prototype.loadImageRels=function(){var t,e,i;return e=DocUtils.decode_utf8(this.zip.files["word/_rels/document.xml.rels"].asText()),this.xmlDoc=DocUtils.Str2xml(e),t=function(){var t,e,s,n;for(s=this.xmlDoc.getElementsByTagName("Relationship"),n=[],t=0,e=s.length;e>t;t++)i=s[t],n.push(parseInt(i.getAttribute("Id").substr(3)));return n}.call(this),this.maxRid=t.max(),this.imageRels=[],this},t.prototype.addExtensionRels=function(t,e){var i,s,n,l,a,o,r,m,p;for(s=this.zip.files["[Content_Types].xml"].asText(),r=DocUtils.Str2xml(s),i=!0,n=r.getElementsByTagName("Default"),m=0,p=n.length;p>m;m++)a=n[m],a.getAttribute("Extension")===e&&(i=!1);return i?(o=r.getElementsByTagName("Types")[0],l=r.createElement("Default"),l.namespaceURI=null,l.setAttribute("ContentType",t),l.setAttribute("Extension",e),o.appendChild(l),this.setImage("[Content_Types].xml",DocUtils.encode_utf8(DocUtils.xml2Str(r)))):void 0},t.prototype.addImageRels=function(t,e){var i,s,n,l;if(null!=this.zip.files["word/media/"+t])throw"file already exists";return this.maxRid++,s={name:"word/media/"+t,data:e,options:{base64:!1,binary:!0,compression:null,date:new Date,dir:!1}},this.zip.file(s.name,s.data,s.options),i=t.replace(/[^.]+\.([^.]+)/,"$1"),this.addExtensionRels("image/"+i,i),l=this.xmlDoc.getElementsByTagName("Relationships")[0],n=this.xmlDoc.createElement("Relationship"),n.namespaceURI=null,n.setAttribute("Id","rId"+this.maxRid),n.setAttribute("Type","http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"),n.setAttribute("Target","media/"+t),l.appendChild(n),this.setImage("word/_rels/document.xml.rels",DocUtils.encode_utf8(DocUtils.xml2Str(this.xmlDoc))),this.maxRid},t.prototype.getImageByRid=function(t){var e,i,s,n,l,a;for(n=this.xmlDoc.getElementsByTagName("Relationship"),l=0,a=n.length;a>l;l++)if(s=n[l],e=s.getAttribute("Id"),t===e&&(i=s.getAttribute("Target"),"media/"===i.substr(0,6)))return this.zip.files["word/"+i];return null},t}(),i.ImgManager=t}).call(this);
(function(){var t,e,n;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser","node"===e&&(global.http=require("http"),global.https=require("https"),global.fs=require("fs"),global.vm=require("vm"),global.DOMParser=require("xmldom").DOMParser,global.XMLSerializer=require("xmldom").XMLSerializer,global.PNG=require("../vendor/pngjs/png-node"),global.url=require("url"),["grid.js","version.js","detector.js","formatinf.js","errorlevel.js","bitmat.js","datablock.js","bmparser.js","datamask.js","rsdecoder.js","gf256poly.js","gf256.js","decoder.js","qrcode.js","findpat.js","alignpat.js","databr.js"].forEach(function(t){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../vendor/jsqrcode/"+t),t)}),["jszip.js"].forEach(function(t){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../vendor/jszip2.0/dist/"+t),t)})),n.DocxGen=t=function(){function t(t,e,i){this.Tags=null!=e?e:{},this.options=i,this.setOptions(this.options),this.finishedCallback=function(){},this.localImageCreator=n,this.filesProcessed=0,this.qrCodeNumCallBack=0,this.qrCodeWaitingFor=[],null!=t&&t.length>0&&this.load(t)}var n,i;return i=["word/document.xml","word/footer1.xml","word/footer2.xml","word/footer3.xml","word/header1.xml","word/header2.xml","word/header3.xml"],n=function(t,e){var n;return n=JSZipBase64.decode("iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPtY7BDYAwDAMZhCf7b8YMxeCoatOQJhWc/KGxT2zlCyaWcz8Y+X7Bs1TFVJSwIHIYyFkQufWIRVX9cNJyW1QpEo4rixaEe7JuQagAUctb7ZFYFh5MVJPBe84CVBnB42//YsZRgKjFDBVg3cI9WbRwXLktQJX8cNIiFhM1ZuTWk7PIYSBhkVcLzwIiCjCxhCjlAkBqYnqFoQQ2AAAAAElFTkSuQmCC"),e(n)},t.prototype.setOptions=function(t){return this.options=t,null!=this.options&&(this.intelligentTagging=null!=this.options.intelligentTagging?this.options.intelligentTagging:!0,this.qrCode=null!=this.options.qrCode?this.options.qrCode:!1,null!=this.options.parser)?this.parser=t.parser:void 0},t.prototype.loadFromFile=function(t,e){var n;return null==e&&(e={}),this.setOptions(e),n={success:function(t){return this.successFun=t},successFun:function(){}},null==e.docx&&(e.docx=!1),null==e.async&&(e.async=!1),null==e.callback&&(e.callback=function(t){return function(e){return t.load(e),n.successFun(t)}}(this)),DocUtils.loadDoc(t,e),e.async===!1?this:n},t.prototype.qrCodeCallBack=function(t,e){var n;return null==e&&(e=!0),e===!0?this.qrCodeWaitingFor.push(t):e===!1&&(n=this.qrCodeWaitingFor.indexOf(t),this.qrCodeWaitingFor.splice(n,1)),this.testReady()},t.prototype.testReady=function(){return 0===this.qrCodeWaitingFor.length&&this.filesProcessed===i.length?(this.ready=!0,this.finishedCallback()):void 0},t.prototype.getImageList=function(){return this.imgManager.getImageList()},t.prototype.setImage=function(t,e,n){return null==n&&(n={}),null==n.binary&&(n.binary=!0),this.imgManager.setImage(t,e,n)},t.prototype.load=function(t){return this.loadedContent=t,this.zip=new JSZip(t),this.imgManager=new ImgManager(this.zip).loadImageRels(),this},t.prototype.applyTags=function(t,e){var n,o,s,r,l,a;for(this.Tags=null!=t?t:this.Tags,null==e&&(e=null),s=0,l=i.length;l>s;s++)o=i[s],null==this.zip.files[o]&&this.filesProcessed++;for(r=0,a=i.length;a>r;r++)o=i[r],null!=this.zip.files[o]&&(n=new DocXTemplater(this.zip.files[o].asText(),{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging,qrCodeCallback:e,localImageCreator:this.localImageCreator,parser:this.parser}),this.setData(o,n.applyTags().content),this.filesProcessed++);return this.testReady()},t.prototype.setData=function(t,e,n){return null==n&&(n={}),this.zip.remove(t),this.zip.file(t,e,n)},t.prototype.getTags=function(){var t,e,n,o,s,r;for(n=[],s=0,r=i.length;r>s;s++)e=i[s],null!=this.zip.files[e]&&(t=new DocXTemplater(this.zip.files[e].asText(),{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging,parser:this.parser}),o=t.applyTags().usedTags,DocUtils.sizeOfObject(o)&&n.push({fileName:e,vars:o}));return n},t.prototype.setTags=function(t){return this.Tags=t,this},t.prototype.output=function(t){var n;return null==t&&(t={}),null==t.download&&(t.download=!0),null==t.name&&(t.name="output.docx"),null==t.type&&(t.type="base64"),n=this.zip.generate({type:t.type}),t.download&&("node"===e?fs.writeFile(process.cwd()+"/"+t.name,n,"base64",function(t){if(t)throw t}):document.location.href="data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"+n),n},t.prototype.getFullText=function(t){var e;return null==t&&(t="word/document.xml"),e=this.zip.files[t].asText(),new DocXTemplater(e,{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}).getFullText()},t.prototype.download=function(t,e,n){var i;return null==n&&(n="default.docx"),i=this.zip.generate(),Downloadify.create("downloadify",{filename:function(){return n},data:function(){return i},onCancel:function(){return alert("You have cancelled the saving of this file.")},onError:function(){return alert("You must put something in the File Contents or there will be nothing to save!")},swf:t,downloadImage:e,width:100,height:30,transparent:!0,append:!1,dataType:"base64"})},t}(),"node"===e&&(module.exports=n.DocxGen)}).call(this);
(function(){var e,t,m;m="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",e=e=function(){function e(e){this.xmlTemplater=e,this.imgMatches=[]}return e.prototype.findImages=function(){return this.imgMatches=DocUtils.preg_match_all(/<w:drawing[^>]*>.*?<\/w:drawing>/g,this.xmlTemplater.content),this},e.prototype.replaceImages=function(){var e,m,o,r,a,l,s,i,n,c,p,d,g,h,x,u,f,w;for(i=[],e=function(e){return e.xmlTemplater.numQrCode--,e.xmlTemplater.DocxGen.setImage("word/media/"+e.imgName,e.data),e.xmlTemplater.DocxGen.qrCodeCallBack(e.num,!1)},f=this.imgMatches,w=[],g=x=0,u=f.length;u>x;g=++x)if(a=f[g],h=DocUtils.Str2xml('<?xml version="1.0" ?><w:document mc:Ignorable="w14 wp14" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">'+a[0]+"</w:document>"),this.xmlTemplater.DocxGen.qrCode)d=h.getElementsByTagNameNS("*","blip")[0],void 0===d&&(d=h.getElementsByTagName("a:blip")[0]),void 0!==d?(n=d.getAttribute("r:embed"),s=this.xmlTemplater.DocxGen.imgManager.getImageByRid(n),null!==s?(p=h.getElementsByTagNameNS("*","docPr")[0],void 0===p&&(p=h.getElementsByTagName("wp:docPr")[0]),void 0!==p&&"Copie_"!==p.getAttribute("name").substr(0,6)?(r=("Copie_"+this.xmlTemplater.imageId+".png").replace(/\x20/,""),this.xmlTemplater.DocxGen.qrCodeNumCallBack++,this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!0),l=this.xmlTemplater.DocxGen.imgManager.addImageRels(r,""),this.xmlTemplater.imageId++,this.xmlTemplater.DocxGen.setImage("word/media/"+r,s.data),p.setAttribute("name",""+r),d.setAttribute("r:embed","rId"+l),m=h.getElementsByTagNameNS("*","drawing")[0],void 0===m&&(m=h.getElementsByTagName("w:drawing")[0]),c=DocUtils.xml2Str(m),this.xmlTemplater.content=this.xmlTemplater.content.replace(a[0],c),this.xmlTemplater.numQrCode++,"browser"===t?(i[g]=new DocxQrCode(s.asBinary(),this.xmlTemplater,r,this.xmlTemplater.DocxGen.qrCodeNumCallBack),w.push(i[g].decode(e))):w.push(/\.png$/.test(s.name)?function(t){return function(m){var o,r,a,l,n;return o=JSZip.base64.encode(s.asBinary()),r=new Buffer(o,"base64"),n=new PNG(r),l=function(o){return n.decoded=o,i[g]=new DocxQrCode(n,t.xmlTemplater,m,t.xmlTemplater.DocxGen.qrCodeNumCallBack),i[g].decode(e)},a=n.decode(l)}}(this)(r):this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!1))):w.push(void 0)):w.push(void 0)):w.push(void 0);else if(null!=this.xmlTemplater.currentScope.img)if(null!=this.xmlTemplater.currentScope.img[g]){if(r=this.xmlTemplater.currentScope.img[g].name,o=this.xmlTemplater.currentScope.img[g].data,null==this.xmlTemplater.DocxGen)throw"DocxGen not defined";l=this.xmlTemplater.DocxGen.imgManager.addImageRels(r,o),p=h.getElementsByTagNameNS("*","docPr")[0],void 0===p&&(p=h.getElementsByTagName("wp:docPr")[0]),void 0!==p?(this.xmlTemplater.imageId++,p.setAttribute("id",this.xmlTemplater.imageId),p.setAttribute("name",""+r),d=h.getElementsByTagNameNS("*","blip")[0],void 0===d&&(d=h.getElementsByTagName("a:blip")[0]),void 0!==d?(d.setAttribute("r:embed","rId"+l),m=h.getElementsByTagNameNS("*","drawing")[0],void 0===m&&(m=h.getElementsByTagName("w:drawing")[0]),w.push(this.xmlTemplater.content=this.xmlTemplater.content.replace(a[0],DocUtils.xml2Str(m)))):w.push(void 0)):w.push(void 0)}else w.push(void 0);else w.push(void 0);return w},e}(),m.ImgReplacer=e}).call(this);
(function(){var t,e,a;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t,a,r,s,l){if(this.xmlTemplater=a,this.imgName=null!=r?r:"",this.num=s,this.callback=l,this.data=t,void 0===this.data)throw"data of qrcode can't be undefined";"browser"===e&&(this.base64Data=JSZip.base64.encode(this.data)),this.ready=!1,this.result=null}return t.prototype.decode=function(t){var a;return this.callback=t,a=this,this.qr=new QrCode,this.qr.callback=function(){var t;return a.ready=!0,a.result=this.result,t=new a.xmlTemplater.currentClass(this.result,a.xmlTemplater.toJson()),t.applyTags(),a.result=t.content,a.searchImage()},"browser"===e?this.qr.decode("data:image/png;base64,"+this.base64Data):this.qr.decode(this.data,this.data.decoded)},t.prototype.searchImage=function(){var t,e,a;if("gen:"===this.result.substr(0,4))return t=function(e){return function(a){return e.data=a,e.callback(e,e.imgName,e.num),e.xmlTemplater.DocxGen.localImageCreator(e.result,t)}}(this);if(null===this.result||void 0===this.result||"error decoding QR Code"===this.result.substr(0,22))return this.callback(this,this.imgName,this.num);a=function(t){return function(e){return t.data=e,t.callback(t,t.imgName,t.num)}}(this);try{return DocUtils.loadDoc(this.result,{docx:!1,callback:a,async:!1})}catch(r){return e=r,console.log(e)}},t}(),a.DocxQrCode=t}).call(this);
(function(){var t,e,a;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",a.XmlTemplater=t=function(){function t(t,e){null==t&&(t=""),null==e&&(e={}),this.tagXml="",this.currentClass=a.XmlTemplater,this.fromJson(e),this.templaterState=new TemplaterState,this.currentScope=this.Tags}return t.prototype.load=function(t){var e;return this.content=t,e=new XmlMatcher(this.content).parse(this.tagXml),this.templaterState.matches=e.matches,this.templaterState.charactersAdded=e.charactersAdded},t.prototype.fromJson=function(t){return this.Tags=null!=t.Tags?t.Tags:{},this.DocxGen=null!=t.DocxGen?t.DocxGen:null,this.intelligentTagging=null!=t.intelligentTagging?t.intelligentTagging:!1,this.scopePath=null!=t.scopePath?t.scopePath:[],this.usedTags=null!=t.usedTags?t.usedTags:{},this.imageId=null!=t.imageId?t.imageId:0,this.parser=null!=t.parser?t.parser:a.DocUtils.defaultParser,this.scopeManager=new ScopeManager(this.Tags,this.scopePath,this.usedTags,this.Tags,this.parser)},t.prototype.toJson=function(){return{Tags:DocUtils.clone(this.scopeManager.tags),DocxGen:this.DocxGen,intelligentTagging:DocUtils.clone(this.intelligentTagging),scopePath:DocUtils.clone(this.scopeManager.scopePath),usedTags:this.scopeManager.usedTags,localImageCreator:this.localImageCreator,imageId:this.imageId,parser:this.parser}},t.prototype.calcIntellegentlyDashElement=function(){return!1},t.prototype.getFullText=function(t){var e,a,r;return this.tagXml=null!=t?t:this.tagXml,a=new XmlMatcher(this.content).parse(this.tagXml),r=function(){var t,r,l,s;for(l=a.matches,s=[],t=0,r=l.length;r>t;t++)e=l[t],s.push(e[2]);return s}(),DocUtils.convert_spaces(r.join(""))},t.prototype.applyTags=function(){var t,e,a,r,l,s,n,i,m,p,h,o,g,c,u;for(this.templaterState.initialize(),c=this.templaterState.matches,s=i=0,h=c.length;h>i;s=++i)for(r=c[s],e=r[2],l=m=0,o=e.length;o>m;l=++m){for(t=e[l],this.templaterState.currentStep={numXmlTag:s,numCharacter:l},u=this.templaterState.matches,n=p=0,g=u.length;g>p;n=++p)if(a=u[n],s>=n&&this.content[a.offset+this.templaterState.charactersAdded[n]]!==a[0][0])throw"no < at the beginning of "+a[0][0]+" (2)";if("{"===t)this.templaterState.startTag();else if("}"===t){if(this.templaterState.endTag(),"simple"===this.templaterState.loopType()&&this.replaceSimpleTag(),"xml"===this.templaterState.loopType())this.replaceSimpleTagRawXml();else if(this.templaterState.isLoopClosingTag())return this.replaceLoopTag()}else this.templaterState.inTag===!0&&(this.templaterState.textInsideTag+=t)}return new ImgReplacer(this).findImages().replaceImages(),this},t.prototype.replaceSimpleTag=function(){return this.content=this.replaceTagByValue(this.scopeManager.getValueFromScope(this.templaterState.textInsideTag))},t.prototype.replaceSimpleTagRawXml=function(){var t,e,a;return a=this.templaterState.calcPosition(this.templaterState.tagStart),t=this.templaterState.calcPosition(this.templaterState.tagEnd),e=this.getOuterXml(this.content,a,t,"w:p").text,this.content=this.content.replace(e,this.scopeManager.getValueFromScope(this.templaterState.tag))},t.prototype.getValueFromScope=function(t){var e,a,r;if(e=this.parser(t),a=e.get(this.scopeManager.currentScope),null!=a)if("string"==typeof a){if(this.scopeManager.useTag(t),r=a,-1!==r.indexOf("{")||-1!==r.indexOf("}"))throw"You can't enter { or  } inside the content of a variable"}else r=a;else this.scopeManager.useTag(t),r="undefined";return r},t.prototype.deleteOuterTags=function(t,e){var a;return this.templaterState.tagEnd={numXmlTag:this.templaterState.loopOpen.end.numXmlTag,numCharacter:this.templaterState.loopOpen.end.numCharacter},this.templaterState.tagStart={numXmlTag:this.templaterState.loopOpen.start.numXmlTag,numCharacter:this.templaterState.loopOpen.start.numCharacter},e===!1&&(this.templaterState.textInsideTag="-"+this.templaterState.loopOpen.element+" "+this.templaterState.loopOpen.tag),e===!0&&(this.templaterState.textInsideTag="#"+this.templaterState.loopOpen.tag),a=this.replaceTagByValue("",t),this.templaterState.tagEnd={numXmlTag:this.templaterState.loopClose.end.numXmlTag,numCharacter:this.templaterState.loopClose.end.numCharacter},this.templaterState.tagStart={numXmlTag:this.templaterState.loopClose.start.numXmlTag,numCharacter:this.templaterState.loopClose.start.numCharacter},this.templaterState.textInsideTag="/"+this.templaterState.loopOpen.tag,this.replaceTagByValue("",a)},t.prototype.dashLoop=function(t,e){var a,r,l,s,n,i,m,p,h,o;for(null==e&&(e=!1),h=this.findOuterTagsContent(),m=h._,n=h.start,a=h.end,l=this.getOuterXml(this.content,n,a,t),i=p=0,o=this.templaterState.matches.length;o>=0?o>=p:p>=o;i=o>=0?++p:--p)this.templaterState.charactersAdded[i]-=l.startTag;return s=l.text,r=this.deleteOuterTags(s,e),this.forLoop(r,s)},t.prototype.xmlToBeReplaced=function(t,e,a,r){return t===!0?a:e===!0?"<"+this.tagXml+' xml:space="preserve">'+a+"</"+this.tagXml+">":this.templaterState.matches[r][1]+a+("</"+this.tagXml+">")},t.prototype.replaceXmlTag=function(t,e){var a,r,l,s,n,i;if(i=e.xmlTagNumber,a=e.insideValue,s=null!=e.spacePreserve?e.spacePreserve:!0,r=null!=e.noStartTag?e.noStartTag:!1,l=this.xmlToBeReplaced(r,s,a,i),this.templaterState.matches[i][2]=a,n=this.templaterState.matches[i].offset+this.templaterState.charactersAdded[i],this.templaterState.charactersAdded[i+1]+=l.length-this.templaterState.matches[i][0].length,-1===t.indexOf(this.templaterState.matches[i][0]))throw"content "+this.templaterState.matches[i][0]+" not found in content";return t=DocUtils.replaceFirstFrom(t,this.templaterState.matches[i][0],l,n),this.templaterState.matches[i][0]=l,t},t.prototype.replaceTagByValue=function(t,e){var a,r,l,s,n,i,m,p,h,o,g,c,u;if(null==e&&(e=this.content),-1===this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].indexOf("}"))throw"no closing tag at @templaterState.tagEnd.numXmlTag "+this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2];if(-1===this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].indexOf("{"))throw"no opening tag at @templaterState.tagStart.numXmlTag "+this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2];if(this.templaterState.tagEnd.numXmlTag===this.templaterState.tagStart.numXmlTag)s={xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].replace("{"+this.templaterState.textInsideTag+"}",t),noStartTag:null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first||null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last},e=this.replaceXmlTag(e,s);else if(this.templaterState.tagEnd.numXmlTag>this.templaterState.tagStart.numXmlTag){for(i=/^([^{]*){.*$/,m=this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].match(i),s={xmlTagNumber:this.templaterState.tagStart.numXmlTag},null==this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first&&null==this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last?s.insideValue=m[1]+t:(s.insideValue=t,s.noStartTag=null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last),e=this.replaceXmlTag(e,s),s={insideValue:"",spacePreserve:!1},r=p=g=this.templaterState.tagStart.numXmlTag+1,c=this.templaterState.tagEnd.numXmlTag;c>=g?c>p:p>c;r=c>=g?++p:--p)this.templaterState.charactersAdded[r+1]=this.templaterState.charactersAdded[r],s.xmlTagNumber=r,e=this.replaceXmlTag(e,s);n=/^[^}]*}(.*)$/,s={insideValue:this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].replace(n,"$1"),spacePreserve:!0,xmlTagNumber:r},this.templaterState.charactersAdded[this.templaterState.tagEnd.numXmlTag+1]=this.templaterState.charactersAdded[this.templaterState.tagEnd.numXmlTag],e=this.replaceXmlTag(e,s)}for(u=this.templaterState.matches,a=h=0,o=u.length;o>h;a=++h)l=u[a],a>this.templaterState.tagEnd.numXmlTag&&(this.templaterState.charactersAdded[a+1]=this.templaterState.charactersAdded[a]);return e},t.prototype.replaceLoopTag=function(){var t;return"dash"===this.templaterState.loopType()?this.dashLoop(this.templaterState.loopOpen.element):this.intelligentTagging===!0&&(t=this.calcIntellegentlyDashElement(),t!==!1)?this.dashLoop(t,!0):this.forLoop()},t.prototype.calcSubXmlTemplater=function(t,e){var a,r,l;return a=this.toJson(),null!=e&&null!=e.Tags&&(a.Tags=e.Tags,a.scopePath=a.scopePath.concat(this.templaterState.loopOpen.tag)),r=new this.currentClass(t,a),l=r.applyTags(),this.imageId=r.imageId,l},t.prototype.getOuterXml=function(t,e,a,r){var l,s;if(l=t.indexOf("</"+r+">",a),-1===l)throw"can't find endTag "+l;if(l+=("</"+r+">").length,s=Math.max(t.lastIndexOf("<"+r+">",e),t.lastIndexOf("<"+r+" ",e)),-1===s)throw"can't find startTag";return{text:t.substr(s,l-s),startTag:s,endTag:l}},t.prototype.findOuterTagsContent=function(){var t,e;return e=this.templaterState.calcStartTag(this.templaterState.loopOpen),t=this.templaterState.calcEndTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.findInnerTagsContent=function(){var t,e;return e=this.templaterState.calcEndTag(this.templaterState.loopOpen),t=this.templaterState.calcStartTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.forLoop=function(t,e){var a,r,l,s,n,i,m;if(null==t&&(t=this.findInnerTagsContent().content),null==e&&(e=this.findOuterTagsContent().content),n=this.scopeManager.currentScope[this.templaterState.loopOpen.tag],r="",null!=n){if("object"==typeof n)for(a=i=0,m=n.length;m>i;a=++i)l=n[a],s=this.calcSubXmlTemplater(t,{Tags:l}),r+=s.content;n===!0&&(s=this.calcSubXmlTemplater(t,{Tags:this.scopeManager.currentScope}),r+=s.content)}else this.calcSubXmlTemplater(t,{Tags:{}});return this.content=this.content.replace(e,r),this.calcSubXmlTemplater(this.content)},t}()}).call(this);
(function(){var t,n,e,l={}.hasOwnProperty,o=function(t,n){function e(){this.constructor=t}for(var o in n)l.call(n,o)&&(t[o]=n[o]);return e.prototype=n.prototype,t.prototype=new e,t.__super__=n.prototype,t};e="undefined"!=typeof global&&null!==global?global:window,n="undefined"!=typeof global&&null!==global?"node":"browser",e.DocXTemplater=t=function(t){function n(t,l){if(null==t&&(t=""),null==l&&(l={}),n.__super__.constructor.call(this,"",l),this.currentClass=e.DocXTemplater,this.tagXml="w:t","string"!=typeof t)throw"content must be string!";this.load(t)}var l;return o(n,t),l=new XmlUtil,n.prototype.calcIntellegentlyDashElement=function(){var t,e,o,r,a,s,i,c;for(c=this.findOuterTagsContent(),t=c.content,r=c.start,e=c.end,o=l.getListXmlElements(this.content,r,e-r),s=0,i=o.length;i>s;s++)if(a=o[s],"<w:tc>"===a.tag)return"w:tr";return n.__super__.calcIntellegentlyDashElement.call(this)},n}(XmlTemplater)}).call(this);
(function(){var t,e,n,s=[].slice;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",n.XmlMatcher=t=function(){function t(t){this.content=t}return t.prototype.parse=function(t){var e;return this.tagXml=t,this.matches=DocUtils.preg_match_all("(<"+this.tagXml+"[^>]*>)([^<>]*)</"+this.tagXml+">",this.content),this.charactersAdded=function(){var t,n,s;for(s=[],e=t=0,n=this.matches.length;n>=0?n>t:t>n;e=n>=0?++t:--t)s.push(0);return s}.call(this),this.handleRecursiveCase(),this},t.prototype.handleRecursiveCase=function(){var t,e,n;return n=function(t){return function(){var e,n,r,a,u;return e=arguments[0],r=4<=arguments.length?s.call(arguments,1,u=arguments.length-2):(u=1,[]),n=arguments[u++],a=arguments[u++],r.unshift(e),r.offset=n,r.first=!0,t.matches.unshift(r),t.charactersAdded.unshift(0)}}(this),this.content.replace(/^()([^<]+)/,n),e=function(t){return function(){var e,n,r,a,u;return e=arguments[0],r=4<=arguments.length?s.call(arguments,1,u=arguments.length-2):(u=1,[]),n=arguments[u++],a=arguments[u++],r.unshift(e),r.offset=n,r.last=!0,t.matches.push(r),t.charactersAdded.push(0)}}(this),t="(<"+this.tagXml+"[^>]*>)([^>]+)$",this.content.replace(new RegExp(t),e),this},t}()}).call(this);
(function(){var e,t,n;n="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",n.ScopeManager=e=function(){function e(e,t,n,o,i){this.tags=e,this.scopePath=t,this.usedTags=n,this.currentScope=o,this.parser=i}return e.prototype.getValueFromScope=function(e){var t,n,o;if(t=this.parser(e),n=t.get(this.currentScope),null!=n)if("string"==typeof n){if(this.useTag(e),o=n,-1!==o.indexOf("{")||-1!==o.indexOf("}"))throw"You can't enter { or  } inside the content of a variable"}else o=n;else this.useTag(e),o="undefined";return o},e.prototype.useTag=function(e){var t,n,o,i,r,s;for(o=this.usedTags,s=this.scopePath,t=i=0,r=s.length;r>i;t=++i)n=s[t],null==o[n]&&(o[n]={}),o=o[n];return""!==e?o[e]=!0:void 0},e}()}).call(this);