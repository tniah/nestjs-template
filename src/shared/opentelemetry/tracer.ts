import {NodeSDK} from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';


const otelSDK = new NodeSDK({
    metricReader: new PrometheusExporter({
        port: process.env.METRIC_PORT ? parseInt(process.env.METRIC_PORT, 10) : 8081,
    }),
    traceExporter: new OTLPTraceExporter({
        url: process.env.OTLP_TRACE_EXPORTER_ENDPOINT || 'http://127.0.0.1:4317',
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
    serviceName: 'nestjs'
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