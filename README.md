# Siteseeker

Welcome to the repository of the Siteseeker!

The Siteseeker is a prototype for an application that supports site acquisitors in the telecommunication industry in Germany. It consolidates data from different public sources to improve their workflow with the aim of accelerating the cellular network rollout.

When using the application, the acquisitor receives the context of the site search area that is important to them: the number and details of public properties including contact options, the integration of protected natural areas, and information about the local administrative structure. In addition, detailed cadastre information from the real estate registers can be displayed directly in order to get to the next steps in the site development more quickly.

This project has been developed with sweat and love by the [Tech4Germany Cohort of 2022](https://digitalservice.bund.de/fellowships/tech4germany/projekte-2022#:~:text=Prozessoptimierung%20im%20Mobilfunkausbau) in collaboration with the [Federal Ministry for Digital and Transport - DK14](https://bmdv.bund.de/EN/Home/home.html). More detailed information on the project can be found [here](https://digitalservice.bund.de/fellowships/tech4germany/projekte-2022).

The prototype can be found in the [user-interface](user-interface) directory. The [summary-site](summary-site) directory contains a showcase website for the prototype. 

---

## Development
This prototype has been developed in Typescript with the Angular framework and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

### Quick Start
Follow these steps to run the application on your local machine:

- Install the Angular cli with: `npm install -g @angular/cli`
- Navigate to the project root: `cd user-interface`
- Install the project dependencies: `npm install`
- Make sure to add the API keys (see next subsection)
- Run `ng serve` for a dev server 
- Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### API Keys
To run the applicaton with all of its features, you need to add a file called `api-keys.ts` in the directory `user-interface/src/environments` and add the necessary the API keys.

You need to register the prototype with your firebase project via the [Firebase CLI](https://firebase.google.com/docs/cli). Please initialise the project at least with firebase authentication, as the app relies on this for the login. Optionally you can also add the hosting option for deployment.

Add the Firebase API configuration in the `user-interface/src/environments/api-keys.ts` like so:
```
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
```

To use the reverse geocoding feature, add the [ArcGIS developers API key](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm) to the file like so:
```
export const reverseGeocodeAPIKey: string = 'Your-API-Key';
```

#### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

---

## System Architecture
![](Siteseeker_Deployment_Diagram.png)

The Siteseeker prototype consumes data from other external services and uses a map framework to visualise the data in an Angular based web app. In the following we want to elaborate on the different components that are utilised, which are displayed in the deployment diagram above.

### Angular & UI Library
We use the web application framework [Angular](https://angular.io/) as the base platform for our web application. It provides us with a framework for routing and bundling the application, and delivers a rich ecosystem of tools and libraries.  

For component styling and icons we utilise [Bootstrap 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/) and [Bootstrap icons](https://icons.getbootstrap.com/) .

### Map Framework
The application heavily relies on the map framework [Openlayers](https://openlayers.org/) for displaying and manipulating geo data. It makes it possible to layer different maps and view over one another to build a composite view. 

### Geo Data Sources
For the base maps the application relies on data from [OpenStreetMap](https://www.openstreetmap.org/#map=14/50.8061/7.6028) as well as satellite imagery from [ArcGIS](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9). Further more we utilise the open APIs of the local [cadastre of Rhineland-Palatinate](https://www.geoportal.rlp.de/) to query maps and metadata on public infrastructure, protected natural areas, etc.

### Reverse Geocoding
To resolve longitute and latitute coordinates to addresses, we utilise reverse geocoding. For this we call the [ArcGIS Geocoding Service](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm).


### API types
The application connects to different types of APIs to ingest data:

- [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer): Used for manuel queries of metadata. Returned data is in [JSON](https://en.wikipedia.org/wiki/JSON) or [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format
- [WebMapService](https://en.wikipedia.org/wiki/Web_Map_Service): Used to ingest pre-rendered map data in image format. Request replies are often in XML format.
- [WebFeatureService](https://en.wikipedia.org/wiki/Web_Feature_Service): Used to query vector format data and metadata. Request replies are in mostly in GeoJSON or in [GML](https://en.wikipedia.org/wiki/Geography_Markup_Language).

All API calls are handled by services in the [core module](user-interface/src/app/core/services). 

### Proxy
To work around [Cross-Origin-Request-Blocking](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) by external servers (e.g. the cadastre servers, where we cannot change the CORS policy), we utilise a proxy in local development to change the request origin. The proxy configuration can be found at ``user-interface/src/proxy.conf.json``.

---

## Deployment
For the deployment of the prototype, we use [Google Firebase Hosting](https://firebase.google.com/products/hosting). Make sure that you have registered your app with firebase as explained in the Quick start section.
Then for deployment follow these steps:

- Run `ng build` to build the project. The built artifacts will be stored in the `dist/user-interface` directory.
- Run `firebase deploy` to deploy the app to firebase.

---

## Roadmap
For an elaborate roadmap on how this prototype should progress into a full-blown application you can check out the [project documentation](https://tech.4germany.org/projekte/) and the [issues](https://github.com/tech4germany/BMDV-Mobilfunk/issues) in this repository. However, we are giving a brief overview over the technical roadmap here.

### Milestones
In the following we define technical milestones that would greatly enhance the application and improve site acquisitors' workflow. These milestones are derived from architectural best practices for enhancing the prototype, and according to feedback from user interviews and user tests.

#### M1: Serverside Data Aggregation
The current prototype is a _showcase application_ and not a fully usable product. All data is persisted in local storage, which can lead to inconsistencies, when the data models are changed. Furthermore, all data used in the application is currently aggregated and consolidated in the frontend. The mapping of API data models to application domain models is hardcoded and not generic, making the integration of new data sources cumbersome. 

To decouple the clientside application from all these problems, a server-side system should be developed. This server-side system should aggregate different data sources, e.g. the cadastre APIs for all the federal states, and provide a unified API with a defined data model to the client-side system. This API should support metadata requests for local administration data, environment data, etc., as well as web feature service and web map service requests. The server-side system should include a mapping layer for external API resources to the custom data model, to support extensibility of the system.

#### M2: Consolidating Federal Geo- & Adminstration data Infrastructure
When a server-side system, as proposed in M1, has been developed, we need to consolidate the existing data sources for geo- and administration data of the individual federal states in Germany to a single data source. For this, a close collaboration with the state administrations is needed, as not all necessary data is currently provided, although all data that is used by the application (except for detailed infrastructure data from the [ISA](https://isa.bundesnetzagentur.de/home/#/)) is public under the [German Open Data Act](http://www.gesetze-im-internet.de/egovg/__12a.html). For coordinating this effort, a close collaboration with the [federal administration unit for open data](https://www.bva.bund.de/DE/Services/Behoerden/Beratung/Beratungszentrum/OpenData/opendata_node.html) is recommended.

#### M3: Authentication with Authorisation Management
The next milestone towards a fully fledged application is the integration of an elaborate authorisation management. As proposed in the [project documentation](https://tech.4germany.org/projekte/), the system is not only relevant for location acquisitors in the telecoms industry, but also for people working in the renewable energy sector, electrical charging infrastructure sector and many more industries. 

To provide all of these users with a user-centric experience, only displaying data relevant to them, a role system is needed. This role system should support scoping available data for certain user groups, and give the administration the ability verify if a user is eligible to view protected data, e.g. infrastructure data from the [ISA](https://isa.bundesnetzagentur.de/home/#/).

#### M4: Integrate detailed Infrastructure Data
After an authorisation management, as proposed in M3, is set up, we can start integrating sensitive data sources into the application, which need user verification. A very useful first data source would be infrastructure data from the [Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Home/home_node.html), which is currently provided via the [ISA](https://isa.bundesnetzagentur.de/home/#/).

#### M5: Order Property Owner Data
When all crucial data that is needed to identify a suitable site is available in the application, the next step would be to integrate the system with all German land registries, to enable users to order property owner data. This heavily relies on the authorisation system proposed in M3. Furthermore, an integration of payment systems of the individual land registries, which only provide this data for money, is needed. This feature ranked very high in our user tests and would speed up the identification process for a suitable infrastructure sites even more. Read more about this in our project documentation.

#### M6 (stretch goal): 3D Topo- & Geodata Integration
To further enhance the site location process for the user group, an integration of detailed 3D models of the topography and surroundings of a site would be very helpful. As the prototype currently uses [Openlayers](https://openlayers.org/) as the underling map framework, an integration with the [CeasiumJS](https://cesium.com/platform/cesiumjs/) library is possible, to integrate 3D models. Based on the 3D models, location acquisitors can evaluate a site based on factors like surrounding building height, slopes and mountains, landscape structure etc.

### Restrictions and Obstacles
On our journey towards the prototype we encountered some technical restrictions and hurdles that need to be taken into account when continuing to work on the prototype:

- API documentations of public APIs (e.g. of the federal geoportals) are often outdated, insufficient or simply not existing.
- The data that we want to utilise in our project is scattered over many data sources in many formats (16 federal states, 10800 municipalities).
- There is no standard for providing administration data, e.g. fields in the provided data are named randomly and there is no standard of what data needs to be provided by which API.
- Most geo services provided by the cadastres return data in pre rendered tiles (WebMapServices) which do not allow for interacting with objects on the maps. For this the cadastre needs to provide the actual features and shapes, together with metadata (WebFeatureServices). The accessibility of these is limited.
- Some relevant data, as mentioned above, can not be provided publicly, e.g. infrastructure data.

