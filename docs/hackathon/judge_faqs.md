# AgriPredict AI — Judge FAQs Cheat Sheet

### Q1: How does your disease scanner handle low-resolution photos taken on cheap smartphones in poor field light?
**Answer**: Our pipeline applies local adaptive contrast normalization (OpenCV CLAHE) and image sharpening before feeding the tensor to our neural classifier. If confidence falls below 70%, the system prompts the farmer for a close-up shot while providing interim preventative advice.

### Q2: How do you support farmers who do not have continuous 4G/5G internet in remote fields?
**Answer**: AgriPredict AI utilizes Progressive Web App (PWA) offline caching. Sensor telemetry, disease diagnostic rules, and speech synthesis run locally in Web Worker caches. When back online, field data syncs silently via WebSockets.

### Q3: What is your data source for Agmarknet commodity price predictions?
**Answer**: We pull real-time daily price feeds from the Government APMC Agmarknet API and enrich them with historical 5-year arrival volumes, seasonal festival demand cycles, and climate anomaly vectors using a Prophet ML time-series engine.

### Q4: How is AgriPredict AI different from government apps like Kisan Suvidha or Plantix?
**Answer**: Unlike static portal apps, AgriPredict AI provides *predictive* rather than reactive intelligence—alerting farmers *before* pest attacks occur. Additionally, our voice assistant supports 15 Indian languages seamlessly with instant audio output.

### Q5: How do you plan to monetize and scale after the hackathon?
**Answer**: We follow a B2B2C model—partnering with Farmer Producer Organizations (FPOs) and regional banks/insurance providers who pay for aggregated land analytics and risk assessment APIs, keeping core diagnostic features free for smallholder farmers.
