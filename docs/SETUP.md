# Set up your Studio

There are two ways to use the Studio. Pick one.

| | Inside Claude (easiest) | On the website |
|---|---|---|
| You need | A Claude account (Pro or higher) and an invitation from Elliot | Just your Flexmls login (an Anthropic API key only for the AI writing tools) |
| AI is paid by | Your Claude plan | Your Anthropic account, per use |
| MLS comes from | The RealMLS connector in Claude, with your Flexmls login | Connect my MLS: a Flexmls sign in through the team relay |
| Works in | claude.ai and the Claude desktop app | Any browser |

Just want cards, signs, flyers and signatures? Either way works with no setup. Setup is only for the AI tools and the MLS tools (CMA report, Listing Video).

## Option A: inside Claude

1. Ask Elliot to invite the email you use for Claude to the Marketing Studio.
2. Open the invitation link while signed in to claude.ai or the Claude desktop app.
3. On the **CMA and Investor Report** tab, click **Open the setup guide** and follow it: turn on AI Settings in Flexmls, add the RealMLS connector in Claude, connect it with your Flexmls login, then click **Allow** when the Studio asks.
4. Fill in your profile (the profile step below). The team roster is already built in.

No API key, proxy or roster file is needed. Stop here.

## Option B: on the website

About 5 minutes, once. You only need your Flexmls username and password.

### 1. Turn on AI access in Flexmls

1. Sign in to **flexmls.com** as usual.
2. Open the **Menu**, then **Preferences**, then **AI Settings** (tip: type AI Settings in the menu search box).
3. Switch the **MCP server** toggle on, read the terms and click **I Agree**.

No AI Settings entry? Update Flexmls, or ask realMLS member support to enable the Flexmls MCP server for your login.

### 2. Connect your MLS

1. On the Studio or CMA page, click **Connections** at the bottom right.
2. Click **Connect my MLS**. A Flexmls sign in window opens.
3. Sign in with **your own** Flexmls username and password and click **Allow**. The window closes itself and the page reloads.

Your password goes only to Flexmls. The sign in travels through the team relay, which stores and logs nothing; your MLS access stays in your own browser.

### 3. Optional: AI writing tools

Create Anything, captions, CMA write-ups and the online lookup use your own Anthropic API key. MLS pulls work without one.

1. Go to **console.anthropic.com**, create an account, add a payment method and set a monthly spend limit under **Limits**.
2. Under **API Keys**, click **Create Key**, name it "iMath Studio", and copy it.
3. In **Connections**, paste the key, click **Test**, then **Save**.

If your Anthropic account belongs to a company organization, the admin may have turned off browser access; the Test button will say so. Use a personal account instead.

Prefer to run your own Spark proxy instead of the relay? That still works: see [PROXY.md](PROXY.md) and use **Advanced** in Connections.

Your sign in and keys are saved only in this browser. On a new computer, connect again. To remove them, click **Remove everything from this browser**.

## 4. Import the team roster

Elliot sends you a file called `roster.json`. In **Connections**, under **Team roster**, click **Import roster file** and choose it. The Studio reloads with the team and the loan officers filled in. Keep the file private; it has everyone's contact details.

## Pull listings from the MLS

On **Social Posts** (Just Listed, Open House, Under Contract, Just Sold) and **Open House Flyers**, choose **Pull from MLS**, type the MLS number or street address, and click **Pull listing**. It fills the address, city, price, beds, baths and square feet. Check the photo box to also bring in the listing photos.

- **Social Posts** use the primary photo.
- **Open House Flyers** show every listing photo. Tap up to four in the order you want them; **1** is the large hero photo. The first four are chosen for you until you change them.
- **Flyer description:** the flyer prints a short description (70 words or less) instead of bullet highlights. It comes from the MLS remarks, shortened by Claude when they are longer. If the MLS has no remarks, it comes from the home's Zillow description (needs Claude and web search). You can edit it; the counter shows the word count, and **Shorten with Claude** trims it. The description prints on Magazine Cover, Classic Grid, Agent Spotlight and Personal Brand; Classic Grid and Agent Spotlight with a loan officer have the least room, and the form tells you when a style cuts it short. Only use photos you have the right to use. For another office's listing, get their permission and add a courtesy line. You can edit anything afterwards, or choose **Enter manually** to type everything yourself.

## 5. Fill in your profile

Pick yourself under **Who are you?**, then check your name, title, phone, email, website and photo. These print on everything you make. Not on the roster yet? Choose **I am not on the list yet** and type your details.

## Problems

| You see | Do this |
|---|---|
| "Your Anthropic API key was rejected." | Copy the key again from console.anthropic.com. Check billing is set up. |
| "Could not reach Anthropic from this browser." | Your organization may block browser access. Use a personal Anthropic account. |
| "Wrong passcode" | Use the exact passcode you set on the proxy. |
| "Origin not allowed" | Set `ALLOWED_ORIGIN` on your proxy to the Studio address (see PROXY.md). |
| "Proxy passcode or Spark key rejected." | Your Spark token may be wrong or expired. Set it again on the proxy. |
| Comps are missing or only show your listings | Your Datamart plan only covers your own listings. Choose a full-MLS plan. |
