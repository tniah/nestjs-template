import {NodeSDK} from '@opentelemetry/sdk-node';
import {getNodeAutoInstrumentations} from '@opentelemetry/auto-instrumentations-node';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-grpc';
import {PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";
import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-grpc"
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';


const otelSDK = new NodeSDK({
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: process.env.OTLP_EXPORTER_OTLP_ENDPOINT || 'http://127.0.0.1:4317',
        }),
        exportIntervalMillis: 1000,
    }),
    // metricReader: new PrometheusExporter({
    //    port: 8081
    // }),
    traceExporter: new OTLPTraceExporter({
        url: process.env.OTLP_EXPORTER_OTLP_ENDPOINT || 'http://127.0.0.1:4317',
        headers: {},
    }),
    instrumentations: [
        getNodeAutoInstrumentations({
            // only instrument fs if it is part of another trace
            '@opentelemetry/instrumentation-fs': {
                requireParentSpan: true,
            },
        })
    ],
    serviceName: process.env.SERVICE_NAME || 'nestjs'
});

export default otelSDK;
// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SDK shut down successfully'),
            (err) => console.log('Error shutting down SDK', err),
        )
        .finally(() => process.exit(0));
});