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
      .compass {
        position: relative;
        width: 500px;
        height: 500px;
        border: 1px solid #000;
        margin: 0 auto;
      }
      .quadrant {
        position: absolute;
        width: 250px;
        height: 250px;
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
        background-color: #000;
      }
      .horizontal-axis {
        width: 100%;
        height: 1px;
        top: 50%;
        left: 0;
      }
      .vertical-axis {
        width: 1px;
        height: 100%;
        top: 0;
        left: 50%;
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
        font-size: 0.8rem;
      }
      .economic-left {
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
      .economic-right {
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
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
    `
    return (
        <div>
          <h1>Political Compass Comparison!</h1>
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
              <input type="number" name="economic" placeholder="Economic" min="-10" max="10" step="0.01" />
              <input type="number" name="social" placeholder="Social" min="-10" max="10" step="0.01" />
              <button type="submit">Add</button>
            </form>
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
