import React from "react";
import { Container, Header, Grid, Form } from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logo from "./assets/logo_sm_white.png";
import FileIcon from "./assets/document-icon.png";
import UploadIcon from "./assets/upload-icon.png";

class App extends React.Component {
  state = {
    file: null,
    numPages: 0,
    pageNumber: 1,
    userPdf: [],
    selectedIndex: null
  };

  onFileChange = event => {
    event.preventDefault();
    if (event.target.files[0] !== undefined) {
      const userRefpdf = [...this.state.userPdf, event.target.files[0]];
      console.log("userref obj", userRefpdf);
      this.setState(
        {
          file: event.target.files[0],
          userPdf: userRefpdf,
          selectedIndex: 1,
        },
        () => {
          document.getElementById("file").value = null;
        }
      );
      event.target = "";
    }
  };

  previewImageReset = (data, index) => {
    this.setState({
      file: data,
      selectedIndex: index + 1
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  nextPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }

    this.setState({
      pageNumber: nextPageNumber
    });
  };


  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div className="container-fluid p-0 h-100">
        <div className="row h-100">
          <div className="col-3 h-100">
            <div className="sidebar">
              <div className="top-section">
                <a href="#" className="logo">
                  <img src={Logo} />
                </a>

                <div className="files-label">Files</div>

                <ul className="list-unstyled files-list" >
                  {this.state.userPdf.length > 0
                    ? this.state.userPdf.map((item, i) => (
                        <li className="media mb-3" key={i}>
                          <img
                            className="mr-3"
                            src={FileIcon}
                            alt="Generic placeholder image"
                          />
                          <div className="media-body">
                            <h5 className="mt-0 mb-1">
                              <a onClick={() => this.previewImageReset(item, i)}>
                                {/* {item.name}  */} Document {i + 1}
                              </a>
                            </h5>
                            {/* <p>Nam vel porta velit</p> */}
                          </div>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>

              <div className="bottom-section">
                <button className="btn upload-btn">

                  <input type="file" id="file" onChange={this.onFileChange} />
                  {/* <img src={UploadIcon} className="mr-2" /> */}
                  {/* Upload Files */}
                </button>
              </div>
            </div>
          </div>
          <div className="col-9 h-100">
            <Container>
              <br />
              <Header textAlign="center">Document {this.state.selectedIndex}</Header>
              <Grid centered columns={2}>
                <Grid.Column textAlign="center" onClick={this.nextPage}>
                  <Document
                    file={this.state.file}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    noData={<h4>No document selected.</h4>}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>

                  {this.state.file ? (
                    <p>
                      Page {pageNumber} of {numPages}
                    </p>
                  ) : null}
                </Grid.Column>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
