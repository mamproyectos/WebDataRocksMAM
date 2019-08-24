import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from './webdatarocks/webdatarocks.angular4'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'WebDataRocksMAM';
  @ViewChild('pivot1', { static: false }) child: WebDataRocksPivot;

  public pivotReport = {
    // beforetoolbarcreated: this.customizeToolbar,
    dataSource: {
      dataSourceType: 'csv',
      fieldSeparator: ';',
      // Fichero creado con Tableau.
      filename: 'https://mamjerez.fra1.digitaloceanspaces.com/CONSULTA%20EJECUCI%C3%92N%20GASTO+(Varias%20conexiones).csv'
      // Problema CORS
      // filename: "https://drive.google.com/file/d/1Fw6zAJ5S0joKcKz5_n8hDToCKMzgPbzq/view"
    },

    // "localization": "https://cdn.webdatarocks.com/loc/es.json",
    // No funciona en local
    // "localization": "../src/assets/es.json",
    localization: 'https://mamjerez.fra1.digitaloceanspaces.com/es.json',

    slice: {
      rows: [
        {
          uniqueName: 'Capítulo'
        },
        {
          uniqueName: 'Capítulo (Capitulos)'
        },
        {
          uniqueName: 'DesEco'
        }
      ],
      columns: [
        {
          uniqueName: 'Measures',
          format: 'mam'
        }
      ],
      measures: [
        {
          uniqueName: 'Créditos Iniciales',
          caption: 'Creditos',
          aggregation: 'sum',
          format: 'mam'
        }
      ],
      sorting: {
        column: {
          type: 'desc',
          tuple: [],
          measure: 'Créditos Iniciales'
        }
      },
      //     expands: {
      //     rows: [
      //         {
      //             tuple: [
      //                 "Capítulo.1"
      //             ]
      //         },
      //         {
      //             tuple: [
      //                 "Capítulo.1",
      //                 "Capítulo (Capitulos).Gastos de personal"
      //             ]
      //         }
      //     ]
      // },
      drills: {
        drillAll: false
      }
    },

    // Fuera del slice.
    conditions: [
      {
        formula: '#value >= 9000000',
        measure: 'Créditos Iniciales',
        format: {
          backgroundColor: '#F44336',
          color: '#3F51B5',
          fontFamily: 'Arial',
          fontSize: '12px'
        }
      }
    ],

    options: {
      grid: {
        showHierarchyCaptions: true,
        showHeaders: false
      }
    },

    formats: [{
      name: 'mam',
      thousandsSeparator: '.',
      decimalSeparator: ',',
      decimalPlaces: 0,
      currencySymbol: '',
      currencySymbolAlign: 'right',
      nullValue: '',
      textAlign: 'right',
      isPercent: false
    }]

  };

  onCustomizeToolbar(toolbar) {
    const tabs = toolbar.getTabs(); // get all tabs from the toolbar
    toolbar.getTabs = () => {
      delete tabs[0]; // delete the first tab
      delete tabs[1];
      // delete tabs[2];
      // delete tabs[4];
      // delete tabs[5];
      // delete tabs[6];
      return tabs;
    };
  }

  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log('[ready] WebDataRocksPivot', this.child);
  }

  onCustomizeCell(
    cell: WebDataRocks.CellBuilder,
    data: WebDataRocks.Cell
  ): void {
    // console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) { cell.addClass('fm-total-classic-r'); }
    if (data.isGrandTotalRow) { cell.addClass('fm-grand-total-r'); }
    if (data.isGrandTotalColumn) { cell.addClass('fm-grand-total-c'); }
  }

}
