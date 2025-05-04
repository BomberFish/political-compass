import 'dreamland/dev';
import './index.css';

const App: Component<{}, {results: Result[]}> = function () {
    this.results = []
    this.css = `
      font-family: system-ui, sans-serif;
      padding: 2rem;
      h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .compass {
        position: relative;
        width: 500px;
        height: 500px;
        max-width: calc(100vw - 4rem);
        max-height: calc(100vw - 4rem);
        border: 2px solid #aaa;
        margin-block: 1rem;
      }

      .quadrant {
        position: absolute;
        width: 249px;
        height: 249px;
        max-width: calc(50vw - 2rem - 2px);
        max-height: calc(50vw - 2rem - 2px);
      }
      .auth-left {
        top: 0;
        left: 0;
        background-color: rgba(255, 0, 0, 0.2); /* Red */
      }
      .auth-right {
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 255, 0.2); /* Blue */
      }
      .lib-left {
        bottom: 0;
        left: 0;
        background-color: rgba(0, 255, 0, 0.2); /* Green */
      }
      .lib-right {
        bottom: 0;
        right: 0;
        background-color: rgba(255, 255, 0, 0.2); /* Yellow */
      }
      .axis {
        position: absolute;
        background-color: #aaa;
      }
      .horizontal-axis {
        width: 100%;
        height: 2px;
        top: calc(50% - 1px);
        left: 0;
      }
      .vertical-axis {
        width: 2px;
        height: 100%;
        top: 0;
        left: calc(50% - 1px);
      }
      .grid-line {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .horizontal-grid {
        width: 100%;
        height: 1px;
      }
      .vertical-grid {
        width: 1px;
        height: 100%;
      }
      .label {
        position: absolute;
        font-size: 1.1rem;
        text-align: center;
        font-weight: 500;
      }
      .economic-left {
        left: 5px;
        top: 50%;
        transform: rotate(-90deg) translateX(-50%);
        transform-origin: top left;
      }
      .economic-right {
        right: 5px;
        top: 50%;
        transform: rotate(90deg) translateX(50%);
        transform-origin: top right;
      }
      .social-auth {
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
      }
      .social-lib {
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
      }

      .point {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #f00;
        border: 2px solid #000;
      }

      .points {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .export {
        margin-bottom: 1rem;
      }

      .import-export {
        margin-top: 2rem;
      }

      .add {
        display: flex;
        gap: 0.3rem;
      }

      @media (prefers-color-scheme: dark) {
        .compass {
          border-color: #7a7a7a;
        }

        .axis {
          background-color: #7a7a7a;
        }

        .grid-line {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .auth-left {
          background-color: rgba(255, 80, 80, 0.4);
        }

        .auth-right {
          background-color: rgba(80, 80, 255, 0.4);
        }

        .lib-left {
          background-color: rgba(80, 255, 80, 0.4);
        }

        .lib-right {
          background-color: rgba(255, 255, 80, 0.4);
        }

        .point {
          background-color: #ff3333;
          border-color: #ccc;
        }
      }
    `
    return (
        <div>
          <h1>Political Compass Comparison!</h1>
          <a href="https://github.com/BomberFish/political-compass" target="_blank" rel="noopener noreferrer">Source Code</a>
          <div class="compass">
            {/* Quadrants */}
            <div class="quadrant auth-left"></div>
            <div class="quadrant auth-right"></div>
            <div class="quadrant lib-left"></div>
            <div class="quadrant lib-right"></div>

            {/* Main axes */}
            <div class="axis horizontal-axis"></div>
            <div class="axis vertical-axis"></div>

            {/* Grid lines - horizontal */}
            <div class="grid-line horizontal-grid" style={{ top: "20%" }}></div>
            <div class="grid-line horizontal-grid" style={{ top: "40%" }}></div>
            <div class="grid-line horizontal-grid" style={{ top: "60%" }}></div>
            <div class="grid-line horizontal-grid" style={{ top: "80%" }}></div>

            {/* Grid lines - vertical */}
            <div class="grid-line vertical-grid" style={{ left: "20%" }}></div>
            <div class="grid-line vertical-grid" style={{ left: "40%" }}></div>
            <div class="grid-line vertical-grid" style={{ left: "60%" }}></div>
            <div class="grid-line vertical-grid" style={{ left: "80%" }}></div>

            {/* Labels */}
            <div class="label economic-left">Economic Left</div>
            <div class="label economic-right">Economic Right</div>
            <div class="label social-auth">Authoritarian</div>
            <div class="label social-lib">Libertarian</div>

            <div class="points">
              {use(this.results, r=>r.map((result)=>(
                <div class="point" title={result.name} style={{
                  left: `${((result.economic + 10) / 20) * 100}%`,
                  top: `${100 - ((result.social + 10) / 20) * 100}%`
                }}></div>
              )))}
            </div>
          </div>
          <form class="add" on:submit={(e: FormDataEvent) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('name') as string;
            const economic = parseFloat(formData.get('economic') as string);
            const social = parseFloat(formData.get('social') as string);
            console.log(formData, name, economic, social);
            this.results.push(new Result(name, economic, social));
            console.log(this.results);
            this.results = [...this.results];
          }}>
              <input type="text" name="name" placeholder="Name" />
              <input type="number" name="economic" placeholder="Economic" min="-10" max="10" step="0.01" required />
              <input type="number" name="social" placeholder="Social" min="-10" max="10" step="0.01" required />
              <button type="submit">Add!</button>
            </form>
            <div class="import-export">
              <h2>Import/Export</h2>

              <div class="export">
                <button bind:disabled={use(this.results, r=>r.length == 0)} on:click={() => {
                  const a = document.createElement('a');
                  a.setAttribute('href', 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(this.results)));
                  a.setAttribute('download', 'political-compass-data.json');
                  a.click();
                }}>
                  Export as JSON
                </button>
              </div>

              <div class="import">
                <label for="import-json">Import JSON: </label>
                <input
                  type="file"
                  id="import-json"
                  accept=".json"
                  on:change={(e: Event) => {
                    const input = e.target as HTMLInputElement;
                    if (input.files && input.files.length > 0) {
                      const reader = new FileReader();
                      reader.readAsText(input.files[0], "UTF-8");
                      reader.onload = e => {
                        if (e.target && e.target.result) {
                          try {
                            const jsonData = JSON.parse(e.target.result as string);
                            if (Array.isArray(jsonData)) {
                              this.results = jsonData.map((item: any) => {
                                return new Result(item.name, item.economic, item.social);
                              });
                            } else {
                              alert("Invalid JSON format. Expected an array of results.");
                            }
                          } catch (error) {
                            console.error("Error parsing JSON file:", error);
                            alert("Error parsing JSON file. Please check the format.");
                          }
                        }
                      };
                    }
                  }}
                />
              </div>
            </div>
        </div>
    );
};

class Result {
  name: string;
    economic: number;
    social: number;

    constructor(name: string, economic: number, social: number) {
        this.name = name;
        this.economic = economic;
        this.social = social;
    }
}

window.addEventListener('load', () => {
    document.getElementById('app')!.replaceWith(<App />);
});
