import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quarterly YOY Audit Template | Josh Andrews",
  description: "A structured quarterly year-over-year email performance audit template for e-commerce brands.",
};

export default function AuditTemplatePage() {
  return (
    <>
      <style>{`
        .audit-page {
          font-family: 'Inter', sans-serif;
          background: #0a0a0f;
          color: #e8e8f0;
          line-height: 1.7;
          padding: 40px 20px;
          min-height: 100vh;
        }
        .audit-container { max-width: 900px; margin: 0 auto; }
        .audit-page h1 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 2.4rem;
          margin: 48px 0 16px;
          text-align: center;
          background: linear-gradient(135deg, #f97316, #ec4899, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .audit-page h1:first-of-type { margin-top: 0; }
        .audit-page h1.audit-subtitle {
          font-size: 1.6rem;
          margin-top: 4px;
          text-align: center;
          opacity: 0.85;
        }
        .audit-page h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #e8e8f0;
          margin: 32px 0 12px;
        }
        .audit-page h3 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #f97316;
          margin: 28px 0 10px;
        }
        .audit-page h4 {
          font-weight: 600;
          font-size: 0.95rem;
          color: #a855f7;
          margin: 20px 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .audit-page p {
          color: rgba(232, 232, 240, 0.6);
          margin-bottom: 12px;
          font-size: 0.95rem;
        }
        .audit-page strong { color: #e8e8f0; }
        .audit-page hr {
          border: none;
          height: 1px;
          background: linear-gradient(135deg, #f97316, #ec4899, #a855f7);
          margin: 40px 0;
          opacity: 0.4;
        }
        .audit-page ul {
          list-style: none;
          padding: 0;
          margin: 12px 0 20px;
        }
        .audit-page ul li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
          color: rgba(232, 232, 240, 0.6);
          font-size: 0.95rem;
        }
        .audit-page ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #f97316;
          font-weight: 700;
        }
        .audit-page table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0 24px;
          background: #1a1a2e;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .audit-page thead {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(168, 85, 247, 0.15));
        }
        .audit-page th {
          text-align: left;
          padding: 12px 16px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #f97316;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .audit-page td {
          padding: 10px 16px;
          font-size: 0.85rem;
          color: rgba(232, 232, 240, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .audit-page tr:last-child td { border-bottom: none; }
        .audit-page tr:hover td { background: rgba(255, 255, 255, 0.02); }
        .audit-page td strong { color: #e8e8f0; }
        .audit-section-card {
          background: #12121a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px;
          margin: 24px 0;
        }
        .audit-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: linear-gradient(135deg, #1a1a2e, #12121a);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          margin-bottom: 32px;
        }
        .audit-header-bar .audit-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          background: linear-gradient(135deg, #f97316, #ec4899, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .audit-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(249, 115, 22, 0.12);
          color: #f97316;
          border: 1px solid rgba(249, 115, 22, 0.25);
        }
      `}</style>

      <div className="audit-page">
        <div className="audit-container">

          <div className="audit-header-bar">
            <span className="audit-logo">Josh Andrews</span>
            <span className="audit-badge">Audit Template</span>
          </div>

          <h1>[CLIENT NAME]</h1>
          <h1 className="audit-subtitle">Q[X] YOY AUDIT</h1>

          <hr />

          <h1>OVERVIEW</h1>

          <div className="audit-section-card">
            <h2><strong>[Client Name] Q[X] [Year] Email Performance Summary (YoY)</strong></h2>
            <p>This part of the report is for assessing <strong>[Client Name]&apos;s</strong> email performance in <strong>Q[X] [Year] YoY</strong>, measuring revenue contribution, campaign and flow effectiveness, list health, and growth opportunities to guide next-quarter improvements. If there is any context to better support this document, please feel free to jump in at any time.</p>
          </div>

          <h3>Total Revenue Impact</h3>
          <ul>
            <li><strong>Total revenue:</strong> $[AMOUNT]</li>
            <li><strong>Change vs same period last year:</strong> [+/-]%</li>
            <li><strong>Attributed to email:</strong> $[AMOUNT] &mdash; <strong>Change vs same period last year:</strong> [+/-]%</li>
          </ul>

          <h4>Insight(s):</h4>
          <ul>
            <li>[Insight about email&apos;s share of total revenue]</li>
            <li>[Insight about campaign vs flow contribution]</li>
            <li>[Insight about engagement and conversion efficiency]</li>
          </ul>

          <h3>Message Type Breakdown</h3>
          <table>
            <thead><tr><th>Type</th><th>Revenue</th><th>% of Email Revenue</th><th>Total Recipients</th><th>YoY Growth</th></tr></thead>
            <tbody>
              <tr><td>Campaigns</td><td>$[AMOUNT]</td><td>[X]%</td><td>[X]</td><td>[+/-]% revenue [+/-]% recipients</td></tr>
              <tr><td>Flows</td><td>$[AMOUNT]</td><td>[X]%</td><td>[X]</td><td>[+/-]% revenue [+/-]% recipients</td></tr>
            </tbody>
          </table>

          <h3>Performance Metrics &ndash; Campaigns vs Flows (Q[X] [Year] YoY)</h3>
          <table>
            <thead><tr><th>Metric</th><th>Campaign &ndash; Email</th><th>Campaign &ndash; SMS</th><th>Flow &ndash; Email</th><th>Flow &ndash; SMS</th></tr></thead>
            <tbody>
              <tr><td>Total Recipients</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td></tr>
              <tr><td>Unique Opens</td><td>[X] ([+/-]%)</td><td>&ndash;</td><td>[X] ([+/-]%)</td><td>&ndash;</td></tr>
              <tr><td>Open Rate</td><td>[X]% ([+/-]%)</td><td>&ndash;</td><td>[X]% ([+/-]%)</td><td>&ndash;</td></tr>
              <tr><td>Unique Clicks</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td></tr>
              <tr><td>Click Rate</td><td>[X]% ([+/-]%)</td><td>[X]% ([+/-]%)</td><td>[X]% ([+/-]%)</td><td>[X]% ([+/-]%)</td></tr>
              <tr><td>Unique Conversions</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td><td>[X] ([+/-]%)</td></tr>
              <tr><td>Conversion Rate</td><td>[X]% ([+/-]%)</td><td>[X]% ([+/-]%)</td><td>[X]% ([+/-]%)</td><td>[X]% ([+/-]%)</td></tr>
              <tr><td>Conversion Value</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td></tr>
              <tr><td>Revenue per Recipient</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td></tr>
              <tr><td>Average Order Value</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td><td>$[X] ([+/-]%)</td></tr>
            </tbody>
          </table>

          <h4>Insight(s):</h4>
          <ul>
            <li>[Insight about campaign performance]</li>
            <li>[Insight about flow performance]</li>
            <li>[Insight about growth opportunities]</li>
          </ul>

          <h3>Email Deliverability &amp; List Health</h3>
          <p><strong>Total recipients:</strong> <strong>[X]</strong> (<strong>[+/-]% YoY</strong>)</p>
          <ul>
            <li><strong>Open rate:</strong> [X]% ([+/-]%)</li>
            <li><strong>Click rate:</strong> [X]% ([+/-]%)</li>
            <li><strong>Bounce rate:</strong> [X]% ([+/-]%)</li>
            <li><strong>Spam complaint rate:</strong> [X]% ([+/-]%)</li>
            <li><strong>Unsubscribe rate:</strong> [X]% ([+/-]%)</li>
          </ul>

          <h4>Insight(s):</h4>
          <ul>
            <li>[Insight about deliverability health]</li>
            <li>[Insight about list hygiene and churn]</li>
          </ul>

          <h3>Concluding Remarks</h3>
          <ul>
            <li>[Key takeaway about overall performance]</li>
            <li>[Key takeaway about campaigns vs flows]</li>
            <li>[Key takeaway about deliverability]</li>
            <li>[Key takeaway about recommended next steps]</li>
          </ul>

          <hr />

          <h1>PERFORMANCE</h1>

          <h3>Campaign Performance YoY &ndash; Q[X] [Year] vs Q[X] [Previous Year]</h3>
          <table>
            <thead><tr><th>Metric</th><th>Q[X] [Year]</th><th>Q[X] [Prev Year]</th><th>YoY Change</th><th>% Difference</th></tr></thead>
            <tbody>
              <tr><td><strong>AOV</strong></td><td>$[X]</td><td>$[X]</td><td>[+/-]$[X]</td><td><strong>[+/-]%</strong></td></tr>
              <tr><td><strong>Conversion Rate</strong></td><td>[X]%</td><td>[X]%</td><td>[+/-]%</td><td><strong>[+/-]%</strong></td></tr>
              <tr><td><strong>RPR</strong></td><td>$[X]</td><td>$[X]</td><td>[+/-]$[X]</td><td><strong>[+/-]%</strong></td></tr>
            </tbody>
          </table>
          <p>[Summary insight about campaign efficiency]</p>

          <h3>Top 5 Revenue-Generating Flows Performance YoY</h3>
          <table>
            <thead><tr><th>Flow Name</th><th>Quarter</th><th>AOV</th><th>Conv Rate</th><th>RPR</th><th>YoY Change</th><th>% Diff</th></tr></thead>
            <tbody>
              <tr><td><strong>[Flow 1]</strong></td><td>Q[X] [Year]</td><td>$[X]</td><td>[X]%</td><td>$[X]</td><td>[Change]</td><td>[%]</td></tr>
              <tr><td><strong>[Flow 2]</strong></td><td>Q[X] [Year]</td><td>$[X]</td><td>[X]%</td><td>$[X]</td><td>[Change]</td><td>[%]</td></tr>
              <tr><td><strong>[Flow 3]</strong></td><td>Q[X] [Year]</td><td>$[X]</td><td>[X]%</td><td>$[X]</td><td>[Change]</td><td>[%]</td></tr>
              <tr><td><strong>[Flow 4]</strong></td><td>Q[X] [Year]</td><td>$[X]</td><td>[X]%</td><td>$[X]</td><td>[Change]</td><td>[%]</td></tr>
              <tr><td><strong>[Flow 5]</strong></td><td>Q[X] [Year]</td><td>$[X]</td><td>[X]%</td><td>$[X]</td><td>[Change]</td><td>[%]</td></tr>
            </tbody>
          </table>
          <ul>
            <li>[Insight about top flow trends]</li>
            <li>[Insight about underperforming flows]</li>
            <li>[Insight about growth opportunities]</li>
          </ul>

          <hr />

          <h1>SIGN UP FORMS</h1>

          <h3>Q[X] [Year] [Form Name] [Mobile]</h3>
          <table>
            <thead><tr><th>Month</th><th>Submit Rate</th><th>Revenue</th><th>Submits</th><th>Views</th></tr></thead>
            <tbody>
              <tr><td>[Month 1]</td><td>[X]%</td><td>$[X]</td><td>[X]</td><td>[X]</td></tr>
              <tr><td>[Month 2]</td><td>[X]%</td><td>$[X]</td><td>[X]</td><td>[X]</td></tr>
              <tr><td>[Month 3]</td><td>[X]%</td><td>$[X]</td><td>[X]</td><td>[X]</td></tr>
            </tbody>
          </table>
          <ul>
            <li>Submit Rate: [+/-]%</li>
            <li>Revenue: [+/-]$[X]</li>
            <li>Submits: [+/-][X]</li>
            <li>Views: [+/-][X]</li>
          </ul>

          <h3>Q[X] [Year] [Form Name] [Desktop]</h3>
          <table>
            <thead><tr><th>Month</th><th>Submit Rate</th><th>Revenue</th><th>Submits</th><th>Views</th></tr></thead>
            <tbody>
              <tr><td>[Month 1]</td><td>[X]%</td><td>$[X]</td><td>[X]</td><td>[X]</td></tr>
              <tr><td>[Month 2]</td><td>[X]%</td><td>$[X]</td><td>[X]</td><td>[X]</td></tr>
              <tr><td>[Month 3]</td><td>[X]%</td><td>$[X]</td><td>[X]</td><td>[X]</td></tr>
            </tbody>
          </table>
          <ul>
            <li>Submit Rate: [+/-]%</li>
            <li>Revenue: [+/-]$[X]</li>
            <li>Submits: [+/-][X]</li>
            <li>Views: [+/-][X]</li>
          </ul>

          <h3>Net New Sign Up Form Suggestions</h3>
          <ul>
            <li><strong>[Form Suggestion 1]:</strong> [Description of who it targets and why]</li>
            <li><strong>[Form Suggestion 2]:</strong> [Description of who it targets and why]</li>
            <li><strong>[Form Suggestion 3]:</strong> [Description of who it targets and why]</li>
          </ul>

          <hr />

          <h1>CAMPAIGNS</h1>
          <ul>
            <li>[Campaign recommendation 1]</li>
            <li>[Campaign recommendation 2]</li>
            <li>[Additional campaign recommendations as needed]</li>
          </ul>

          <hr />

          <h1>FLOWS</h1>
          <table>
            <thead><tr><th>Flow Name</th><th>Feedback</th></tr></thead>
            <tbody>
              <tr><td><strong>[Flow 1]</strong></td><td>[Detailed feedback: what&apos;s working, what needs fixing, specific recommendations]</td></tr>
              <tr><td><strong>[Flow 2]</strong></td><td>[Detailed feedback]</td></tr>
              <tr><td><strong>[Flow 3]</strong></td><td>[Detailed feedback]</td></tr>
              <tr><td><strong>[Flow 4]</strong></td><td>[Detailed feedback]</td></tr>
              <tr><td><strong>[Flow 5]</strong></td><td>[Detailed feedback]</td></tr>
              <tr><td><strong>[Flow 6]</strong></td><td>[Detailed feedback]</td></tr>
              <tr><td><strong>[Flow 7]</strong></td><td>[Detailed feedback]</td></tr>
            </tbody>
          </table>

          <h4>Net New Flow Suggestions:</h4>
          <ul>
            <li><strong>[Flow Suggestion 1]</strong></li>
            <li><strong>[Flow Suggestion 2]</strong></li>
            <li><strong>[Flow Suggestion 3]</strong></li>
            <li><strong>[Flow Suggestion 4]</strong></li>
          </ul>

          <hr />

          <h1>SUMMARY</h1>

          <div className="audit-section-card">
            <h3>Sign-Up Forms</h3>
            <ul>
              <li>[Summary action item 1]</li>
              <li>[Summary action item 2]</li>
              <li>[Summary action item 3]</li>
            </ul>

            <h3>Campaigns</h3>
            <ul>
              <li>[Summary action item 1]</li>
              <li>[Summary action item 2]</li>
            </ul>

            <h3>Flows</h3>
            <ul>
              <li>[Summary action item 1]</li>
              <li>[Summary action item 2]</li>
              <li>[Summary action item 3]</li>
              <li>[Summary action item 4]</li>
              <li>[Summary action item 5]</li>
              <li>[Additional action items as needed]</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
