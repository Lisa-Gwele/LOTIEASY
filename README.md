# Loti Easy — MSc FinTech usability prototype

## Purpose
A mobile-first educational demonstration comparing two authentication experiences for a hypothesised customer segment: adults over 75 living independently in central Maseru, Lesotho. The segment, problem prevalence, preferences, and commercial demand are **not validated**.

## Run
Open `index.html` in a modern browser (Chrome, Firefox, Safari, or Edge). No installation, server, external dependencies, network access, or bank account is needed. For local development you may optionally use VS Code Live Server.

## Files
- `index.html` — accessible structure, controls, research form
- `styles.css` — mobile-first responsive styling, large-text and contrast options
- `app.js` — demo journeys and in-tab usability observations

## Test procedure
1. Obtain informed consent; explain that this is a demo and there are no real payments or biometric scans.
2. Use an anonymous participant ID such as P01. Do not record names, bank details, passwords, or actual OTPs.
3. Enable Researcher mode, set order AB or BA, and start a test.
4. Ask the participant to check a *fictional* balance. Test both code and biometric versions, alternating order across participants.
5. After each method, select assistance level, ease rating and comprehension, then Save current trial. If the participant cannot complete a trial, save it as incomplete.
6. Ask preference after both methods. Select the preference before saving the final trial (or record it separately in your researcher notes).
7. Export CSV before closing or refreshing the page. **Observations are held in memory only**; refreshing or closing the tab loses them. Export downloads a local CSV file.

## Limitations and research cautions
- This is not a banking application; it cannot access accounts or move money.
- The biometric button is purely simulated. It does not authenticate anyone or use the device biometric API.
- The practice code `482916` is displayed on screen and is not a real security mechanism.
- The two variants are not security-equivalent. Results compare comprehension/usability of mock interactions, not real-world authentication security or feasibility.
- Timing begins when an authentication method is opened and ends when a trial is saved, so it includes researcher rating time. For rigorous timing, time task completion separately or adapt the code to freeze time at success/abandonment.
- Switching methods before saving can discard the prior method's unsaved observations.
- Sesotho translations are partial and require native-speaker review; do not rely on them for field research yet.
- Large text and contrast are design features, not proof of WCAG conformance. Conduct manual accessibility and screen-reader tests.
- The research panel is not password protected and should not be used for sensitive data.
- Do not assume older adults are digitally inexperienced; recruit diverse participants and observe actual behaviour.

## Next steps
Validate the segment and pain point with real interviews; test the prototype with consent; refine design based on findings before creating a landing page or making product claims.


## Basotho visual identity update
The interface includes two AI-generated illustrative portraits of Basotho elders and a Lesotho-inspired landscape background. The photos are decorative and are not images of real customers. Keep `basotho-elder-left.jpg` and `basotho-elder-right.jpg` alongside the HTML, CSS and JS files. All demo interactions remain simulated. Test readability with actual older adults before treating this as accessible.
