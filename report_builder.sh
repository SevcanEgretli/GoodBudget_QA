#!/usr/bin/env bash
npx mochawesome-merge cypress/reports/*.json -o cypress/reports/report.json
npx marge cypress/reports/report.json -f report -o cypress/reports
